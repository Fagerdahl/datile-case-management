package dev.datile.mapper;

import dev.datile.domain.Errand;
import dev.datile.dto.errands.ErrandListItemDto;
import dev.datile.dto.errands.StatusDto;
import org.springframework.stereotype.Component;

/* ErrandMapper takes an Errand entity and translates it to a DTO (ErrandListItemDto (API-format))
 * We keep all mapping in one place to avoid spaghetti all over the place.
 *
 * */

@Component
public class ErrandMapper {

    public ErrandListItemDto toListItemDto(Errand e) {
        return new ErrandListItemDto(
                e.getErrandId(),
                e.getCreatedAt(),
                e.getTitle(),
                new StatusDto(e.getStatus().getStatusId(), e.getStatus().getName())
        );
    }
}