from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
import numpy as np
import json
import os
import requests
from typing import List, Optional
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# FastAPI Initialization
app = FastAPI(
    title="CareLoop NLP Service",
    description="CareLoop NLP + Llama 3.1 Answering System",
    version="3.1.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GLOBALS
model = None
qa_database = []

SIM_THRESHOLD_HIGH = 0.85
SIM_THRESHOLD_MED = 0.70

# HuggingFace Llama API settings
HF_API_TOKEN = os.getenv("HF_API_TOKEN")
HF_MODEL_ID = "meta-llama/Llama-3.1-8B-Instruct"
HF_API_URL = "https://router.huggingface.co/v1/chat/completions"


# Data models
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


# STARTUP: Load embedding model + dataset
@app.on_event("startup")
async def startup_load():
    global model, qa_database

    logger.info("🚀 Loading sentence-transformer model...")
    model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

    logger.info("📚 Loading Q&A database...")
    with open("qa_data_with_embeddings.json", "r", encoding="utf-8") as f:
        qa_database = json.load(f)

    logger.info(f"✅ Loaded {len(qa_database)} Q&A entries")


# COSINE SIMILARITY
def cosine_similarity(a, b):
    a = np.array(a)
    b = np.array(b)
    if np.linalg.norm(a) == 0 or np.linalg.norm(b) == 0:
        return 0.0
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))


# FIND BEST MATCH FROM DATABASE
def find_best_match(q_emb):
    best = None
    best_score = 0.0

    for qa in qa_database:
        score = cosine_similarity(q_emb, qa["embedding"])
        if score > best_score:
            best_score = score
            best = qa

    return best, best_score


# BUILD DYNAMIC SYSTEM PROMPT
def build_system_prompt(user_question, best_match):
    topic = best_match["topic"]

    related_examples = [
        qa for qa in qa_database if qa["topic"] == topic
    ][:5]

    examples_text = "\n\n".join([
        f"Q: {qa['question']}\nA: {qa['answer']}"
        for qa in related_examples
    ])

    # FINAL improved system prompt
    system_prompt = f"""
You are CareLoop AI Assistant.

CareLoop is a medicine-delivery platform in India.  
We provide:
- doorstep medicine delivery  
- prescription uploads  
- partnered pharmacies  
- PCI-DSS secure payment  
- chat-based ordering  

🛑 IMPORTANT RULES FOR ANSWERING:
1. If the user asks about services CareLoop does NOT provide  
   (food delivery, grocery, electronics, rides, cab booking, clothing, etc.),  
   ALWAYS reply clearly:
   👉 "CareLoop only delivers medicines. We do not deliver food or other non-medical items."

2. NEVER say "I cannot answer that".  
   ALWAYS give the correct clarification.

3. Use only the knowledge provided in the examples below.  
   No hallucinations.

4. Stay short, friendly and factual.

Detected Topic: {topic}

Relevant Knowledge Examples:
{examples_text}

Now provide the best possible answer to the user's question.
""".strip()

    return system_prompt


# CALL LLAMA 3.1 MODEL
def call_llama(system_prompt, user_question, mode):
    """
    mode = "medium" or "low"
    medium → slightly higher temperature
    low → very strict, grounded
    """
    temperature = 0.3 if mode == "medium" else 0.15

    headers = {
        "Authorization": f"Bearer {HF_API_TOKEN}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": HF_MODEL_ID,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_question}
        ],
        "max_tokens": 250,
        "temperature": temperature
    }

    response = requests.post(HF_API_URL, headers=headers, json=payload)

    if response.status_code != 200:
        logger.error(f"Llama API error: {response.text}")
        return None

    return response.json()["choices"][0]["message"]["content"]


# MAIN ANSWER ROUTE
@app.post("/answer", response_model=AnswerResponse)
async def answer(req: QuestionRequest):
    global model, qa_database

    if not model or not qa_database:
        raise HTTPException(status_code=500, detail="Service initialization failed")

    logger.info(f"📥 Question received: {req.question}")

    # Encode question
    q_emb = model.encode(req.question)

    # Find best match
    best, score = find_best_match(q_emb)
    logger.info(f"🔍 Similarity score = {score:.3f}")

    # HIGH CONFIDENCE → Direct stored answer
    if score >= SIM_THRESHOLD_HIGH:
        logger.info("✔ High similarity → returning database answer")
        return AnswerResponse(
            answer=best["answer"],
            confidence=round(score, 3),
            matched_question=best["question"],
            topic=best["topic"]
        )

    # For both low + medium → use Llama
    logger.info("🤖 Using Llama for answer generation")

    system_prompt = build_system_prompt(req.question, best)

    if score >= SIM_THRESHOLD_MED:
        # medium mode
        llama_answer = call_llama(system_prompt, req.question, mode="medium")
    else:
        # strict mode
        llama_answer = call_llama(system_prompt, req.question, mode="low")

    if llama_answer is None:
        llama_answer = best["answer"]  # fallback

    return AnswerResponse(
        answer=llama_answer,
        confidence=round(score, 3),
        matched_question="Llama Generated",
        topic=best["topic"]
    )


# HEALTH CHECK
@app.get("/health", response_model=HealthResponse)
async def health():
    return HealthResponse(
        status="healthy" if model else "unhealthy",
        model_loaded=model is not None,
        total_questions=len(qa_database)
    )


@app.get("/")
async def root():
    return {"service": "CareLoop NLP", "version": "3.1.0"}


# Run with: uvicorn app:app --host 0.0.0.0 --port 7860
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7860)