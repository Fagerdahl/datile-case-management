package dev.datile.dto.errands;

public record BulkStatusUpdateDto(
        Long fromStatusId,
        Long toStatusId
) {}
