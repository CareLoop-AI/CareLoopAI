from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from transformers import pipeline
import numpy as np
import json
from typing import List, Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="CareLoop Chatbot NLP Service",
    description="Hugging Face powered NLP service for question answering",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your Spring Boot URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables
model = None
qa_model = None
qa_database = []
SIMILARITY_THRESHOLD_HIGH = 0.85  # Direct answer threshold
SIMILARITY_THRESHOLD_LOW = 0.70   # Generate answer threshold

# Pydantic models for request/response
class QuestionRequest(BaseModel):
    question: str

class AnswerResponse(BaseModel):
    answer: str
    confidence: float
    matched_question: str
    topic: Optional[str] = None

class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    total_questions: int

# Load model and data on startup
@app.on_event("startup")
async def load_model_and_data():
    """
    Load Hugging Face models and Q&A database on startup
    """
    global model, qa_model, qa_database
    
    try:
        logger.info("🚀 Loading sentence-transformers model...")
        model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
        logger.info("✅ Sentence model loaded successfully!")
        
        logger.info("🚀 Loading QA generation model...")
        qa_model = pipeline(
            "text2text-generation",
            model="google/flan-t5-base",
            max_length=512,
            device=-1  # CPU
        )
        logger.info("✅ QA model loaded successfully!")
        
        logger.info("📚 Loading Q&A database...")
        with open('qa_data_with_embeddings.json', 'r', encoding='utf-8') as f:
            qa_database = json.load(f)
        logger.info(f"✅ Loaded {len(qa_database)} Q&A pairs!")
        
    except Exception as e:
        logger.error(f"❌ Error during startup: {str(e)}")
        raise

def cosine_similarity(embedding1, embedding2):
    """
    Calculate cosine similarity between two embeddings
    """
    embedding1 = np.array(embedding1)
    embedding2 = np.array(embedding2)
    
    dot_product = np.dot(embedding1, embedding2)
    norm1 = np.linalg.norm(embedding1)
    norm2 = np.linalg.norm(embedding2)
    
    if norm1 == 0 or norm2 == 0:
        return 0.0
    
    return float(dot_product / (norm1 * norm2))

def find_best_match(question_embedding):
    """
    Find the best matching question from database
    Returns: (best_match_qa, similarity_score)
    """
    best_match = None
    best_score = 0.0
    
    for qa in qa_database:
        score = cosine_similarity(question_embedding, qa['embedding'])
        
        if score > best_score:
            best_score = score
            best_match = qa
    
    return best_match, best_score

def get_context_for_generation(best_match, top_n=3):
    """
    Get context from top similar answers for text generation
    """
    context_parts = []
    
    # Add the best match
    if best_match:
        context_parts.append(f"Topic: {best_match['topic']}\nQ: {best_match['question']}\nA: {best_match['answer']}")
    
    # Add related answers from same topic
    same_topic_answers = [
        qa for qa in qa_database 
        if qa['topic'] == best_match['topic'] and qa['id'] != best_match['id']
    ][:top_n-1]
    
    for qa in same_topic_answers:
        context_parts.append(f"Q: {qa['question']}\nA: {qa['answer']}")
    
    return "\n\n".join(context_parts)

def generate_answer_from_context(question, context):
    """
    Generate answer using the QA model with provided context
    """
    try:
        prompt = f"""Based on the following information, answer this question: {question}

Context:
{context}

Answer:"""
        
        result = qa_model(prompt, max_length=200, min_length=30, do_sample=False)
        generated_answer = result[0]['generated_text'].strip()
        
        return generated_answer
    except Exception as e:
        logger.error(f"Error generating answer: {str(e)}")
        return None

# API Endpoints

@app.get("/", response_model=dict)
async def root():
    """
    Root endpoint
    """
    return {
        "message": "CareLoop Chatbot NLP Service",
        "version": "1.0.0",
        "endpoints": {
            "/health": "Health check",
            "/answer": "Get answer for a question (POST)",
            "/encode": "Encode a question to embedding (POST)"
        }
    }

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint
    """
    return HealthResponse(
        status="healthy" if model is not None else "unhealthy",
        model_loaded=model is not None,
        total_questions=len(qa_database)
    )

@app.post("/encode", response_model=dict)
async def encode_question(request: QuestionRequest):
    """
    Encode a question into an embedding vector
    """
    try:
        if model is None:
            raise HTTPException(status_code=500, detail="Model not loaded")
        
        embedding = model.encode(request.question).tolist()
        
        return {
            "question": request.question,
            "embedding": embedding,
            "dimension": len(embedding)
        }
    
    except Exception as e:
        logger.error(f"Error encoding question: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/answer", response_model=AnswerResponse)
async def get_answer(request: QuestionRequest):
    """
    Main endpoint: Get answer for a user question
    Supports both direct matching and contextual generation
    """
    try:
        if model is None or qa_model is None or len(qa_database) == 0:
            raise HTTPException(status_code=500, detail="Service not ready")
        
        logger.info(f"📥 Received question: {request.question}")
        
        # Step 1: Encode the user's question
        question_embedding = model.encode(request.question)
        
        # Step 2: Find best matching question
        best_match, similarity_score = find_best_match(question_embedding)
        
        logger.info(f"🔍 Best match score: {similarity_score:.3f}")
        
        # Step 3: Decision based on similarity score
        if similarity_score >= SIMILARITY_THRESHOLD_HIGH:
            # High confidence - return direct answer
            logger.info(f"✅ High confidence match! Returning direct answer")
            
            return AnswerResponse(
                answer=best_match['answer'],
                confidence=round(similarity_score, 3),
                matched_question=best_match['question'],
                topic=best_match['topic']
            )
            
        elif similarity_score >= SIMILARITY_THRESHOLD_LOW:
            # Medium confidence - generate answer from context
            logger.info(f"🤖 Medium confidence. Generating answer from context...")
            
            context = get_context_for_generation(best_match, top_n=3)
            generated_answer = generate_answer_from_context(request.question, context)
            
            if generated_answer:
                logger.info(f"✅ Successfully generated answer")
                
                return AnswerResponse(
                    answer=generated_answer,
                    confidence=round(similarity_score, 3),
                    matched_question=f"Generated from: {best_match['question']}",
                    topic=best_match['topic']
                )
            else:
                # Fallback to direct answer if generation fails
                logger.warning(f"⚠️ Generation failed, returning direct answer")
                
                return AnswerResponse(
                    answer=best_match['answer'],
                    confidence=round(similarity_score, 3),
                    matched_question=best_match['question'],
                    topic=best_match['topic']
                )
        else:
            # Low confidence - return fallback message
            logger.info(f"❌ No confident match found (score: {similarity_score:.3f})")
            
            return AnswerResponse(
                answer="I apologize, but I don't have information about that specific question. Please try rephrasing or select from our predefined questions.",
                confidence=0.0,
                matched_question="No match found",
                topic=None
            )
    
    except Exception as e:
        logger.error(f"Error processing question: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/batch-answer", response_model=List[AnswerResponse])
async def get_batch_answers(questions: List[str]):
    """
    Process multiple questions at once (optional endpoint)
    """
    try:
        results = []
        
        for question in questions:
            request = QuestionRequest(question=question)
            answer = await get_answer(request)
            results.append(answer)
        
        return results
    
    except Exception as e:
        logger.error(f"Error in batch processing: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Run with: uvicorn app:app --host 0.0.0.0 --port 7860
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7860)




# curl -X POST http://localhost:7860/answer \
#   -H "Content-Type: application/json" \
#   -d '{"question":"Does CareLoop store my payment information?"}'