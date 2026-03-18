import { apiClient } from "../services/apiClient";

export type StatusOption = {
    statusId: number;
    name: string;
};

export const fetchStatuses = (): Promise<StatusOption[]> =>
    apiClient.get<StatusOption[]>("/api/statuses");