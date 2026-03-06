package dev.datile.dto.errands;

import java.util.List;

/* Wrapper with errands
 * ErrandsResponseDto responsibility =
 * 1. provide frontend with the right meta. Frontend can´t build pagination without this.
 * 2. Keep JPA entities un-exposed */

public record ErrandsResponseDto(
        List<ErrandListItemDto> errands,
        int page,
        int size,
        long totalElements,
        int totalPages
) {
}