package dev.datile.service;

import dev.datile.dto.errands.ErrandDetailsDto;
import dev.datile.dto.errands.ErrandsResponseDto;
import dev.datile.dto.errands.PriorityDto;
import dev.datile.dto.errands.StatusDto;
import dev.datile.mapper.ErrandMapper;
import dev.datile.repository.ErrandHistoryRepository;
import dev.datile.repository.ErrandRepository;
import dev.datile.spec.ErrandSpecifications;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.data.jpa.domain.Specification;
import dev.datile.domain.Errand;
import org.springframework.web.server.ResponseStatusException;


import java.util.Arrays;
import java.util.List;

/* This is the service layer that pulls the data.
 * Service layers´ responsibility = business logic and orchestration.
 * ErrandService takes pagination and sort, pulls from ErrandRepository and maps to DTO.
 * + Returns the format that we want! */

@Service
public class ErrandService {

    private final ErrandHistoryRepository historyRepo;
    private final ErrandRepository repo;
    private final ErrandMapper mapper;

    public ErrandService(ErrandRepository repo, ErrandMapper mapper, ErrandHistoryRepository historyRepo) {
        this.repo = repo;
        this.mapper = mapper;
        this.historyRepo = historyRepo;
    }

    public ErrandsResponseDto list(String statusIdsCsv, int page, int size, String sortBy, String sortDir) {
        final var statusIds = parseCsvLongs(statusIdsCsv);

        final var spec = Specification.where(ErrandSpecifications.statusIdIn(statusIds));

        final var pageable = PageRequest.of(
                Math.max(page, 0),
                size <= 0 ? 20 : Math.min(size, 200),
                Sort.by(parseDirection(sortDir), mapSortField(sortBy))
        );

        final var result = repo.findAll(spec, pageable);

        final var errands = result.getContent();
        final var ids = errands.stream().map(Errand::getErrandId).toList();

        final var rows = ids.isEmpty()
                ? List.<ErrandHistoryRepository.HistoryPreviewRow>of()
                : historyRepo.findHistoryPreview(ids, 2);

        final var historyMap = rows.stream()
                .collect(java.util.stream.Collectors.groupingBy(
                        ErrandHistoryRepository.HistoryPreviewRow::getErrandId,
                        java.util.stream.Collectors.mapping(r ->
                                        new dev.datile.dto.errands.HistoryEntryDto(
                                                r.getDescription(),
                                                r.getVerifiedName(),
                                                r.getCreatedAt().toInstant()
                                        ),
                                java.util.stream.Collectors.toList()
                        )
                ));

        final var dtos = errands.stream()
                .map(e -> mapper.toListItemDto(e, historyMap.getOrDefault(e.getErrandId(), List.of())))
                .toList();

        return new ErrandsResponseDto(dtos, result.getNumber(), result.getSize(), result.getTotalElements(), result.getTotalPages());
    }

    public ErrandDetailsDto getById(Long id) {
        Errand errand = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ärende inte hittat"));

        final var history = historyRepo.findFullHistoryByErrandId(id).stream()
                .map(h -> new dev.datile.dto.errands.HistoryEntryDto(
                        h.getDescription(),
                        h.getVerifiedName(),
                        h.getCreatedAt().toInstant()
                ))
                .toList();

        return new ErrandDetailsDto(
                errand.getErrandId(),
                errand.getCreatedAt(),
                errand.getTitle(),
                errand.getDescription(),
                new StatusDto(
                        errand.getStatus().getStatusId(),
                        errand.getStatus().getName()
                ),
                new PriorityDto(
                        errand.getPriority().getPriorityId(),
                        errand.getPriority().getName(),
                        errand.getPriority().getColor()
                ),
                null,
                null,
                null,
                history,
                null,
                null
        );
    }

    private List<Long> parseCsvLongs(String csv) {
        if (csv == null || csv.isBlank()) return List.of();
        return Arrays.stream(csv.split(","))
                .map(String::trim)
                .filter(s -> !s.isBlank())
                .map(Long::valueOf)
                .toList();
    }

    private Sort.Direction parseDirection(String sortDir) {
        return "desc".equalsIgnoreCase(sortDir) ? Sort.Direction.DESC : Sort.Direction.ASC;
    }

    private String mapSortField(String sortBy) {
        if (sortBy == null || sortBy.isBlank() || "date".equalsIgnoreCase(sortBy)) return "createdAt";
        if ("title".equalsIgnoreCase(sortBy)) return "title";
        throw new IllegalArgumentException("Invalid sortBy: " + sortBy);
    }
}
