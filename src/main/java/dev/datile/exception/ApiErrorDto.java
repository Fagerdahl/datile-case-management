package dev.datile.exception;

/* Standardized error handling when someone sends invalid params like sortBy=HACKER */

public record ApiErrorDto(String status, String message) {}