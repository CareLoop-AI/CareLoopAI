package com.backend.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuestionSubmitRequest {

//    @NotBlank(message = "Email is required")
//    @Email(message = "Invalid email format")
    private String email;

//    @NotBlank(message = "Question is required")
//    @Size(min = 10, max = 1000, message = "Question must be between 10 and 1000 characters")
    private String question;
}
