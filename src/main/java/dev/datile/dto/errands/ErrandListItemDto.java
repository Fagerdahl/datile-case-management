package dev.datile.dto.errands;

import java.time.Instant;

/* A light errand object that is suitable for the list/cards
 * We only send what is necessary to show the list - not every single detail.
 * DTOs´ keeps JPA entities un-exposed */

public record ErrandListItemDto(
        Long errandId,
        Instant createdAt,
        String title,
        StatusDto status
        // later customer/priority/assignee
) {
}