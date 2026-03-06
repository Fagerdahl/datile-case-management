import type {ErrandsResponse, ErrandDetails} from "../types/errands";

export const fetchErrandById = async (id: number): Promise<ErrandDetails> => {
    const res = await fetch(`/api/errands/${id}`);

    if (!res.ok) {
        const body = await res.text();
        throw new Error(body || `Request failed (${res.status})`);
    }

    return res.json();
};
export const fetchErrands = async (params: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: string;
    statusIds?: number[];
}): Promise<ErrandsResponse> => {
    const url = new URL("/api/errands", window.location.origin);

    url.searchParams.set("page", String(params.page ?? 0));
    url.searchParams.set("size", String(params.size ?? 20));
    url.searchParams.set("sortBy", params.sortBy ?? "date");
    url.searchParams.set("sortDir", params.sortDir ?? "desc");

    if (params.statusIds?.length) {
        url.searchParams.set("statusIds", params.statusIds.join(","));
    }

    const res = await fetch(url.toString());

    if (!res.ok) {
        const body = await res.text();
        throw new Error(body || `Request failed (${res.status})`);
    }

    return res.json();
};