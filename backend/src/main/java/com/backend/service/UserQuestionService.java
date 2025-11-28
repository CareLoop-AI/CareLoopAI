package com.backend.service;

import com.backend.DTO.QuestionSubmitRequest;
import com.backend.DTO.QuestionSubmitResponse;
import com.backend.Entity.UserQuestion;
import com.backend.Entity.type.QuestionStatus;
import com.backend.Exception.RateLimitExceededException;
import com.backend.Repository.UserQuestionRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserQuestionService {

    private final UserQuestionRepository questionRepository;
    private final EmailService emailService;

    @Value("${careloop.rate-limit.questions-per-day:10}")
    private int questionsPerDay;

    @Value("${careloop.rate-limit.questions-per-hour:5}")
    private int questionsPerHour;

    /**
     * Submit a new user question
     */
    @Transactional
    public QuestionSubmitResponse submitQuestion(QuestionSubmitRequest request, HttpServletRequest httpRequest) throws RateLimitExceededException {

        // Extract user information
        String userIp = extractClientIp(httpRequest);
        String userAgent = httpRequest.getHeader("User-Agent");

        // Check rate limits
        checkRateLimits(request.getEmail(), userIp);

        // Create and save the question
        UserQuestion question = UserQuestion.builder()
                .email(request.getEmail())
                .question(request.getQuestion())
                .status(QuestionStatus.PENDING)
                .userIp(userIp)
                .userAgent(userAgent)
                .build();

        UserQuestion savedQuestion = questionRepository.save(question);
        log.info("New question submitted - ID: {}, Email: {}", savedQuestion.getId(), savedQuestion.getEmail());

        // Send notification emails asynchronously
        try {
            emailService.sendNewQuestionNotification(savedQuestion);
            emailService.sendConfirmationToUser(savedQuestion);
        } catch (Exception e) {
            log.error("Failed to send email notifications for question ID: {}", savedQuestion.getId(), e);
            // Don't fail the request if email sending fails
        }

        return QuestionSubmitResponse.success(savedQuestion.getId(), savedQuestion.getCreatedAt());
    }

    /**
     * Check rate limits to prevent spam
     */
    private void checkRateLimits(String email, String ip) throws RateLimitExceededException {
        LocalDateTime oneDayAgo = LocalDateTime.now().minusDays(1);
        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);

        // Check email-based rate limit (per day)
        long questionsFromEmailToday = questionRepository.countByEmailSince(email, oneDayAgo);
        if (questionsFromEmailToday >= questionsPerDay) {
            log.warn("Rate limit exceeded for email: {}", email);
            throw new RateLimitExceededException(
                    String.format("You have exceeded the daily limit of %d questions. Please try again tomorrow.",
                            questionsPerDay)
            );
        }

        // Check IP-based rate limit (per hour)
        long questionsFromIpLastHour = questionRepository.countByIpSince(ip, oneHourAgo);
        if (questionsFromIpLastHour >= questionsPerHour) {
            log.warn("Rate limit exceeded for IP: {}", ip);
            throw new RateLimitExceededException(
                    "Too many questions submitted. Please wait an hour before submitting again."
            );
        }
    }

    /**
     * Extract client IP address from request
     */
    private String extractClientIp(HttpServletRequest request) {
        String clientIp = request.getHeader("X-Forwarded-For");

        if (clientIp == null || clientIp.isEmpty() || "unknown".equalsIgnoreCase(clientIp)) {
            clientIp = request.getHeader("X-Real-IP");
        }

        if (clientIp == null || clientIp.isEmpty() || "unknown".equalsIgnoreCase(clientIp)) {
            clientIp = request.getRemoteAddr();
        }

        // X-Forwarded-For can contain multiple IPs, take the first one
        if (clientIp != null && clientIp.contains(",")) {
            clientIp = clientIp.split(",")[0].trim();
        }

        return clientIp;
    }

    /**
     * Get all questions by status (for admin dashboard)
     */
    @Transactional(readOnly = true)
    public List<UserQuestion> getQuestionsByStatus(QuestionStatus status) {
        return questionRepository.findByStatusOrderByCreatedAtDesc(status);
    }

    /**
     * Get all pending questions (for admin dashboard)
     */
    @Transactional(readOnly = true)
    public List<UserQuestion> getPendingQuestions() {
        return questionRepository.findByStatusInOrderByCreatedAtDesc(
                List.of(QuestionStatus.PENDING, QuestionStatus.IN_PROGRESS)
        );
    }

    /**
     * Update question status (for admin dashboard)
     */
    @Transactional
    public UserQuestion updateQuestionStatus(Long questionId, QuestionStatus newStatus, String answeredBy) {
        UserQuestion question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found with ID: " + questionId));

        question.setStatus(newStatus);

        if (newStatus == QuestionStatus.ANSWERED) {
            question.setAnsweredAt(LocalDateTime.now());
            question.setAnsweredBy(answeredBy);
        }

        return questionRepository.save(question);
    }

    /**
     * Get questions by email (for user's question history)
     */
    @Transactional(readOnly = true)
    public List<UserQuestion> getQuestionsByEmail(String email) {
        return questionRepository.findByEmailOrderByCreatedAtDesc(email);
    }

    /**
     * Get question statistics (for admin dashboard)
     */
    @Transactional(readOnly = true)
    public List<Object[]> getQuestionStatistics() {
        return questionRepository.getQuestionStatistics();
    }

    /**
     * Get old pending questions (for notification/reminder system)
     */
    @Transactional(readOnly = true)
    public List<UserQuestion> getOldPendingQuestions(int daysOld) {
        LocalDateTime cutoffDate = LocalDateTime.now().minusDays(daysOld);
        return questionRepository.findOldPendingQuestions(cutoffDate);
    }
}
