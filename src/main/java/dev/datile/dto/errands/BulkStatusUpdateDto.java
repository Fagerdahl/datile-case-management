
package dev.datile.dto.errands;

import java.time.LocalDate;

public record BulkStatusUpdateDto(
        Long fromStatusId,
        Long toStatusId,
        LocalDate fromDate,
        LocalDate toDate
) {}
