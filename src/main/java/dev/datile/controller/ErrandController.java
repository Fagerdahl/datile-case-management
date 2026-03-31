package dev.datile.controller;

import dev.datile.dto.errands.*;
import dev.datile.service.ErrandService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/* Everything in this class is API routes under /api/errands
 * @GetMapping means: when someone does GET /api/errands -> run this method
 */

@RestController
@RequestMapping("/api/errands")
public class ErrandController {

    private final ErrandService service;

    public ErrandController(ErrandService service) {
        this.service = service;
    }

    @GetMapping
    public ErrandsResponseDto list(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) Long assigneeId,
            @RequestParam(required = false) Long customerId,
            @RequestParam(required = false) String q,
            @RequestParam(defaultValue = "date") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "20") Integer size
    ) {
        ErrandFilterRequest filter = new ErrandFilterRequest(
                status,
                priority,
                assigneeId,
                customerId,
                q,
                sortBy,
                sortDir,
                page,
                size
        );

        return service.list(filter);
    }

    @GetMapping("/{id}")
    public ErrandDetailsDto getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ErrandDetailsDto> updateErrand(
            @PathVariable Long id,
            @Valid @RequestBody UpdateErrandDto request
    ) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @PostMapping("/{id}/history")
    public ResponseEntity<ErrandDetailsDto> addHistoryEntry(
            @PathVariable Long id,
            @Valid @RequestBody AddHistoryEntryDto request
    ) {
        return ResponseEntity.ok(service.addHistoryEntry(id, request));
    }

    @PostMapping
    public ResponseEntity<ErrandDetailsDto> createErrand(
            @Valid @RequestBody CreateErrandDto request
    ) {
        return ResponseEntity.ok(service.create(request));
    }

    @PutMapping("/bulk-status")
    public ResponseEntity<Void> bulkUpdateStatus(
            @RequestBody BulkStatusUpdateDto request
    ) {
        service.bulkUpdateStatus(request);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/bulk-status/count")
    public ResponseEntity<Long> countBulkUpdate(
            @RequestParam Long fromStatusId
    ) {
        return ResponseEntity.ok(service.countByStatus(fromStatusId));
    }
}