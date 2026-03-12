package dev.datile.service;

import dev.datile.domain.Errand;
import dev.datile.domain.Purchase;
import dev.datile.dto.reports.ReportListItemDto;
import dev.datile.dto.reports.ReportsResponseDto;
import dev.datile.mapper.ReportMapper;
import dev.datile.repository.ErrandRepository;
import dev.datile.repository.PurchaseRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ReportService {

    private static final Set<String> ALLOWED_SORTS = Set.of(
            "customer",
            "contact",
            "title",
            "status",
            "priority",
            "assignee",
            "timeSpent"
    );

    private final ErrandRepository errandRepository;
    private final PurchaseRepository purchaseRepository;
    private final ReportMapper reportMapper;

    public ReportService(
            ErrandRepository errandRepository,
            PurchaseRepository purchaseRepository,
            ReportMapper reportMapper
    ) {
        this.errandRepository = errandRepository;
        this.purchaseRepository = purchaseRepository;
        this.reportMapper = reportMapper;
    }

    public ReportsResponseDto getReports(
            Instant dateFrom,
            Instant dateTo,
            Long customerId,
            Long assigneeId,
            List<Long> statusIds,
            List<Long> priorityIds,
            String sortBy,
            int page,
            int size
    ) {
        Instant effectiveFrom = dateFrom != null
                ? dateFrom
                : LocalDate.now().minusDays(30).atStartOfDay().toInstant(ZoneOffset.UTC);

        Instant effectiveTo = dateTo != null
                ? dateTo
                : LocalDate.now().plusDays(1).atStartOfDay().minusNanos(1).toInstant(ZoneOffset.UTC);

        if (effectiveFrom.isAfter(effectiveTo)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "dateFrom must be before or equal to dateTo");
        }

        String effectiveSort = (sortBy == null || sortBy.isBlank()) ? "customer" : sortBy;

        if (!ALLOWED_SORTS.contains(effectiveSort)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid sortBy value");
        }

        if (page < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "page must be 0 or greater");
        }

        if (size <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "size must be greater than 0");
        }

        Specification<Errand> specification = Specification
                .where(createdAtBetween(effectiveFrom, effectiveTo))
                .and(customerEquals(customerId))
                .and(assigneeEquals(assigneeId))
                .and(statusIn(statusIds))
                .and(priorityIn(priorityIds));

        PageRequest pageRequest = PageRequest.of(page, size, buildSort(effectiveSort));
        Page<Errand> resultPage = errandRepository.findAll(specification, pageRequest);

        List<Long> errandIds = resultPage.getContent().stream()
                .map(Errand::getErrandId)
                .toList();

        Map<Long, List<Purchase>> purchasesByErrandId = purchaseRepository.findByErrand_ErrandIdIn(errandIds).stream()
                .collect(Collectors.groupingBy(purchase -> purchase.getErrand().getErrandId()));

        List<ReportListItemDto> reports = resultPage.getContent().stream()
                .map(errand -> reportMapper.toReportListItemDto(
                        errand,
                        purchasesByErrandId.getOrDefault(errand.getErrandId(), List.of())
                ))
                .toList();

        return new ReportsResponseDto(
                reports,
                resultPage.getNumber(),
                resultPage.getSize(),
                resultPage.getTotalElements(),
                resultPage.getTotalPages()
        );
    }

    private Sort buildSort(String sortBy) {
        return switch (sortBy) {
            case "customer" -> Sort.by("customer.name").ascending();
            case "contact" -> Sort.by("contact.lastName").ascending()
                    .and(Sort.by("contact.firstName").ascending());
            case "title" -> Sort.by("title").ascending();
            case "status" -> Sort.by("status.name").ascending();
            case "priority" -> Sort.by("priority.name").ascending();
            case "assignee" -> Sort.by("assignee.name").ascending();
            case "timeSpent" -> Sort.by("timeSpent").ascending();
            default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid sortBy value");
        };
    }

    private Specification<Errand> createdAtBetween(Instant from, Instant to) {
        return (root, query, cb) -> cb.between(root.get("createdAt"), from, to);
    }

    private Specification<Errand> customerEquals(Long customerId) {
        if (customerId == null) {
            return null;
        }

        return (root, query, cb) -> cb.equal(root.get("customer").get("customerId"), customerId);
    }

    private Specification<Errand> assigneeEquals(Long assigneeId) {
        if (assigneeId == null) {
            return null;
        }

        return (root, query, cb) -> cb.equal(root.get("assignee").get("assigneeId"), assigneeId);
    }

    private Specification<Errand> statusIn(List<Long> statusIds) {
        if (statusIds == null || statusIds.isEmpty()) {
            return null;
        }

        return (root, query, cb) -> root.get("status").get("statusId").in(statusIds);
    }

    private Specification<Errand> priorityIn(List<Long> priorityIds) {
        if (priorityIds == null || priorityIds.isEmpty()) {
            return null;
        }

        return (root, query, cb) -> root.get("priority").get("priorityId").in(priorityIds);
    }
}