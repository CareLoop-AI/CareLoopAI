package com.backend.Exception;

public class RateLimitExceededException extends Exception {
    public RateLimitExceededException(String message) {
        super(message);
    }
}
