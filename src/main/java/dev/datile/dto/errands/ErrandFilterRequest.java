package dev.datile.dto.errands;

public record ErrandFilterRequest(
        String status,
        String priority,
        Long assigneeId,
        Long customerId,
        String q,
        String sortBy,
        String sortDir,
        Integer page,
        Integer size
) {
}