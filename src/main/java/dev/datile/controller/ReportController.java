package dev.datile.controller;

import dev.datile.dto.reports.ReportFilterRequestDto;
import dev.datile.dto.reports.ReportsResponseDto;
import dev.datile.service.ReportExportService;
import dev.datile.service.ReportQueryService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportQueryService reportQueryService;
    private final ReportExportService reportExportService;

    public ReportController(
            ReportQueryService reportQueryService,
            ReportExportService reportExportService
    ) {
        this.reportQueryService = reportQueryService;
        this.reportExportService = reportExportService;
    }
    @GetMapping
    public ReportsResponseDto getReports(
            @RequestParam(required = false) LocalDate dateFrom,
            @RequestParam(required = false) LocalDate dateTo,
            @RequestParam(required = false) Long customerId,
            @RequestParam(required = false) Long assigneeId,
            @RequestParam(required = false) String statusIds,
            @RequestParam(required = false) String priorityIds,
            @RequestParam(required = false, defaultValue = "customer") String sortBy,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "20") int size
    ) {
        ReportFilterRequestDto request = new ReportFilterRequestDto(
                dateFrom,
                dateTo,
                customerId,
                assigneeId,
                parseIds(statusIds),
                parseIds(priorityIds),
                sortBy,
                page,
                size
        );

        return reportQueryService.getReports(request);
    }

    @GetMapping("/export/csv")
    public ResponseEntity<byte[]> exportReportsCsv(
            @RequestParam(required = false) LocalDate dateFrom,
            @RequestParam(required = false) LocalDate dateTo,
            @RequestParam(required = false) Long customerId,
            @RequestParam(required = false) Long assigneeId,
            @RequestParam(required = false) String statusIds,
            @RequestParam(required = false) String priorityIds,
            @RequestParam(required = false, defaultValue = "customer") String sortBy
    ) {
        ReportFilterRequestDto request = new ReportFilterRequestDto(
                dateFrom,
                dateTo,
                customerId,
                assigneeId,
                parseIds(statusIds),
                parseIds(priorityIds),
                sortBy,
                0,
                Integer.MAX_VALUE
        );

        byte[] csvBytes = reportExportService.exportCsv(request);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=reports.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csvBytes);
    }


    private List<Long> parseIds(String raw) {
        if (raw == null || raw.isBlank()) {
            return List.of();
        }

        try {
            return Arrays.stream(raw.split(","))
                    .map(String::trim)
                    .filter(value -> !value.isBlank())
                    .map(Long::valueOf)
                    .toList();
        } catch (NumberFormatException exception) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid id list: " + raw
            );
        }
    }
}