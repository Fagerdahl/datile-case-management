package dev.datile.service;

import dev.datile.dto.reports.ReportFilterRequestDto;

public interface ReportExportService {
    byte[] exportCsv(ReportFilterRequestDto request);
}