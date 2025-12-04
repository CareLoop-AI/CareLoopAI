package com.backend.controller;

import com.backend.DTO.AnswerResponse;
import com.backend.DTO.QuestionRequest;
import com.backend.service.NLPService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/v1/chatbot")
@RequiredArgsConstructor
public class ChatBotController {

    private final NLPService nlpService;

    @PostMapping("/ask")
    public ResponseEntity<AnswerResponse> askQuestion(@RequestBody QuestionRequest request) {
        AnswerResponse answer = nlpService.getAnswer(request);
        return ResponseEntity.ok(answer);
    }

    @GetMapping("/topics")
    public ResponseEntity<List<String>> getTopics() {
        // Return your 12 topics
        List<String> topics = Arrays.asList(
                "Safety & Compliance",
                "Returns & Refunds"
                // ... other topics
        );
        return ResponseEntity.ok(topics);
    }
}
