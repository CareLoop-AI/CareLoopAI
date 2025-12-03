package com.backend.service;

import com.backend.DTO.AnswerResponse;
import com.backend.DTO.QuestionRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class NLPService {

    @Value("${nlp.service.url}")
    private String nlpServiceUrl;

    private final RestTemplate restTemplate;

    public AnswerResponse getAnswer(QuestionRequest questionRequest) {
        String url = nlpServiceUrl + "/answer";

        try {
            return restTemplate.postForEntity(
                    url,
                    questionRequest,
                    AnswerResponse.class
            ).getBody();
        }
        catch (Exception e) {
            AnswerResponse fallback = new AnswerResponse();
            fallback.setAnswer("Sorry, I'm having trouble processing your question right now.");
            fallback.setConfidence(0.0);
            return fallback;
        }
    }
}
