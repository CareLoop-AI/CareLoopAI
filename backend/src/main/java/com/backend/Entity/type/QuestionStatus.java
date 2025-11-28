package com.backend.Entity.type;

public enum QuestionStatus {
    PENDING,      // Question just submitted
    IN_PROGRESS,  // Someone is working on answering
    ANSWERED,     // Question has been answered
    SPAM,         // Marked as spam
    ARCHIVED
}
