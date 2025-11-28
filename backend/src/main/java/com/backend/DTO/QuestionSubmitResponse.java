package com.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuestionSubmitResponse {
    private Long id;
    private String message;
    private LocalDateTime submittedAt;
    private boolean success;

    public static QuestionSubmitResponse success(Long id, LocalDateTime submittedAt) {
        return QuestionSubmitResponse.builder()
                .id(id)
                .message("Your question has been submitted successfully. We'll get back to you soon!")
                .submittedAt(submittedAt)
                .success(true)
                .build();
    }

    public static QuestionSubmitResponse error(String message) {
        return QuestionSubmitResponse.builder()
                .message(message)
                .success(false)
                .build();
    }
}
