package com.backend.Repository;

import com.backend.Entity.UserQuestion;
import com.backend.Entity.type.QuestionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface UserQuestionRepository extends JpaRepository<UserQuestion, Long> {

    /**
     * Find all questions by email address
     */
    List<UserQuestion> findByEmailOrderByCreatedAtDesc(String email);

    /**
     * Find all questions by status
     */
    List<UserQuestion> findByStatusOrderByCreatedAtDesc(QuestionStatus status);

    /**
     * Find pending questions (for admin dashboard)
     */
    List<UserQuestion> findByStatusInOrderByCreatedAtDesc(List<QuestionStatus> statuses);

    /**
     * Count questions by email in the last 24 hours (spam prevention)
     */
    @Query("SELECT COUNT(q) FROM UserQuestion q WHERE q.email = :email AND q.createdAt >= :since")
    long countByEmailSince(@Param("email") String email, @Param("since") LocalDateTime since);

    /**
     * Find recent questions from same IP (spam prevention)
     */
    @Query("SELECT COUNT(q) FROM UserQuestion q WHERE q.userIp = :ip AND q.createdAt >= :since")
    long countByIpSince(@Param("ip") String ip, @Param("since") LocalDateTime since);

    /**
     * Get statistics for dashboard
     */
    @Query("SELECT q.status, COUNT(q) FROM UserQuestion q GROUP BY q.status")
    List<Object[]> getQuestionStatistics();

    /**
     * Find unanswered questions older than specified date
     */
    @Query("SELECT q FROM UserQuestion q WHERE q.status = 'PENDING' AND q.createdAt < :date ORDER BY q.createdAt ASC")
    List<UserQuestion> findOldPendingQuestions(@Param("date") LocalDateTime date);
}
