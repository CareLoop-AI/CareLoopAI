package com.backend.controller;

import com.backend.DTO.QuestionSubmitRequest;
import com.backend.DTO.QuestionSubmitResponse;
import com.backend.Entity.UserQuestion;
import com.backend.Entity.type.QuestionStatus;
import com.backend.Exception.RateLimitExceededException;
import com.backend.service.UserQuestionService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/faq")
@RequiredArgsConstructor
@Slf4j
//@CrossOrigin(origins = "http://localhost:5173")
@Validated
public class UserQuestionController {

    private final UserQuestionService userQuestionService;

    @PostMapping("/questions")
    public ResponseEntity<QuestionSubmitResponse> submitQuestion(
            @Valid @RequestBody QuestionSubmitRequest request,
            HttpServletRequest httpServletRequest
    ) throws RateLimitExceededException {
        System.out.println("in the submitQuestions method.");
        log.info("Received question submission from email: {}", request.getEmail());

        QuestionSubmitResponse response = userQuestionService.submitQuestion(request , httpServletRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Get questions by email (for user to see their question history)
     * GET /api/v1/faq/questions/my?email=user@example.com
     */
    @GetMapping("/questions/my")
    public ResponseEntity<List<UserQuestion>> getMyQuestions(@RequestParam String email) {
        log.info("Fetching questions for email: {}", email);
        List<UserQuestion> questions = userQuestionService.getQuestionsByEmail(email);
        return ResponseEntity.ok(questions);
    }

    // ==================== ADMIN ENDPOINTS ====================
    // Note: In production, these should be protected with proper authentication/authorization

    /**
     * Get all pending questions (Admin only)
     * GET /api/v1/faq/admin/questions/pending
     */
    @GetMapping("/admin/questions/pending")
    public ResponseEntity<List<UserQuestion>> getPendingQuestions() {
        log.info("Fetching all pending questions");
        List<UserQuestion> questions = userQuestionService.getPendingQuestions();
        return ResponseEntity.ok(questions);
    }

    /**
     * Get questions by status (Admin only)
     * GET /api/v1/faq/admin/questions?status=PENDING
     */
    @GetMapping("/admin/questions")
    public ResponseEntity<List<UserQuestion>> getQuestionsByStatus(
            @RequestParam QuestionStatus status) {
        log.info("Fetching questions with status: {}", status);
        List<UserQuestion> questions = userQuestionService.getQuestionsByStatus(status);
        return ResponseEntity.ok(questions);
    }

    /**
     * Update question status (Admin only)
     * PATCH /api/v1/faq/admin/questions/{id}/status
     */
    @PatchMapping("/admin/questions/{id}/status")
    public ResponseEntity<UserQuestion> updateQuestionStatus(
            @PathVariable Long id,
            @RequestParam QuestionStatus status,
            @RequestParam(required = false) String answeredBy) {
        log.info("Updating question {} to status: {}", id, status);
        UserQuestion updated = userQuestionService.updateQuestionStatus(id, status, answeredBy);
        return ResponseEntity.ok(updated);
    }

    /**
     * Get question statistics (Admin only)
     * GET /api/v1/faq/admin/statistics
     */
    @GetMapping("/admin/statistics")
    public ResponseEntity<List<Object[]>> getStatistics() {
        log.info("Fetching question statistics");
        List<Object[]> stats = userQuestionService.getQuestionStatistics();
        return ResponseEntity.ok(stats);
    }

    /**
     * Get old pending questions (Admin only)
     * GET /api/v1/faq/admin/questions/old-pending?days=3
     */
    @GetMapping("/admin/questions/old-pending")
    public ResponseEntity<List<UserQuestion>> getOldPendingQuestions(
            @RequestParam(defaultValue = "3") int days) {
        log.info("Fetching pending questions older than {} days", days);
        List<UserQuestion> questions = userQuestionService.getOldPendingQuestions(days);
        return ResponseEntity.ok(questions);
    }

    /**
     * Health check endpoint
     * GET /api/v1/faq/health
     */
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("FAQ Service is running");
    }
}
