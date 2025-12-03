---
title: CareLoop Chatbot NLP Service
emoji: 🤖
colorFrom: blue
colorTo: green
sdk: docker
pinned: false
---

# CareLoop Chatbot NLP Service

Hugging Face powered NLP service for intelligent question answering using sentence transformers.

## Features

- 🤖 Semantic question matching using sentence-transformers
- 📊 220+ pre-trained Q&A pairs across 12 topics
- ⚡ Fast inference with cached embeddings
- 🎯 85% similarity threshold for accurate responses
- 🔄 RESTful API for easy integration

## API Endpoints

### GET `/health`
Health check endpoint

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "total_questions": 220
}
```

### POST `/answer`
Get answer for a user question

**Request:**
```json
{
  "question": "How do I return a product?"
}
```

**Response:**
```json
{
  "answer": "You can return products within 30 days...",
  "confidence": 0.92,
  "matched_question": "What is your return policy?",
  "topic": "Returns & Refunds"
}
```

### POST `/encode`
Encode a question to embedding vector

**Request:**
```json
{
  "question": "What is your refund policy?"
}
```

**Response:**
```json
{
  "question": "What is your refund policy?",
  "embedding": [0.123, -0.456, ...],
  "dimension": 384
}
```

## Model Information

- **Model:** sentence-transformers/all-MiniLM-L6-v2
- **Size:** ~80MB
- **Embedding Dimension:** 384
- **Speed:** ~50-100ms per inference

## Usage from Spring Boot

```java
RestTemplate restTemplate = new RestTemplate();
String url = "https://your-username-chatbot-nlp.hf.space/answer";

Map<String, String> request = new HashMap<>();
request.put("question", userQuestion);

ResponseEntity<AnswerResponse> response = restTemplate.postForEntity(
    url, 
    request, 
    AnswerResponse.class
);
```

## Local Testing

```bash
# Install dependencies
pip install -r requirements.txt

# Run the service
uvicorn app:app --host 0.0.0.0 --port 7860

# Test endpoint
curl -X POST http://localhost:7860/answer \
  -H "Content-Type: application/json" \
  -d '{"question": "How do I track my order?"}'
```

## Environment Variables

No environment variables required! All data is embedded in the deployment.

## License

MIT License

---

**Powered by Hugging Face 🤗**


curl -X POST https://YOUR_USERNAME-careloop-chatbot-nlp.hf.space/answer \
  -H "Content-Type: application/json" \
  -d '{"question": "Does CareLoop store my payment information?"}'