import { apiClient } from "../services/apiClient";
import type { ReportFilters, ReportsResponse } from "../types/reports";

const toStartOfDayIso = (date: string) => `${date}T00:00:00Z`;
const toEndOfDayIso = (date: string) => `${date}T23:59:59Z`;

export const buildReportParams = (filters: ReportFilters) => {
    const params: Record<string, string | number | boolean | null | undefined> = {
        sortBy: filters.sortBy,
        page: filters.page,
        size: filters.size,
    };

    if (filters.dateFrom) {
        params.dateFrom = toStartOfDayIso(filters.dateFrom);
    }

    if (filters.dateTo) {
        params.dateTo = toEndOfDayIso(filters.dateTo);
    }

    if (typeof filters.customerId === "number") {
        params.customerId = filters.customerId;
    }

    if (typeof filters.assigneeId === "number") {
        params.assigneeId = filters.assigneeId;
    }

    if (filters.statusIds.length > 0) {
        params.statusIds = filters.statusIds.join(",");
    }

    if (filters.priorityIds.length > 0) {
        params.priorityIds = filters.priorityIds.join(",");
    }

    return params;
};

export const fetchReports = async (filters: ReportFilters) =>
    apiClient.get<ReportsResponse>("/reports", {
        params: buildReportParams(filters),
    });