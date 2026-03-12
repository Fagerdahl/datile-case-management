import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchErrands } from "../api/errandsApi";
import { ErrandCard } from "../components/ErrandCard";
import { ErrandListRow } from "../components/ErrandListRow";
import { ErrandDetailsModal } from "../components/ErrandDetailsModal";
import { FilterPanel } from "../components/FilterPanel";
import {
    type ErrandsResponse,
    type ErrandDetails,
    type ErrandFilters,
    buildErrandFilterParams,
    initialErrandFilters,
} from "../types/errands";

/* React component for an errand card */

export default function Errands() {
    const [data, setData] = useState<ErrandsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [view, setView] = useState<"cards" | "list">("cards");
    const [selectedErrandId, setSelectedErrandId] = useState<number | null>(null);
    const [filters, setFilters] = useState<ErrandFilters>(initialErrandFilters);
    const [debouncedQ, setDebouncedQ] = useState(filters.q);
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true);
    const navigate = useNavigate();

    const openModal = (errandId: number) => {
        setSelectedErrandId(errandId);
    };

    const closeModal = () => {
        setSelectedErrandId(null);
    };

    const handleErrandUpdated = (updatedErrand: ErrandDetails) => {
        setData((current) => {
            if (!current) return current;

            return {
                ...current,
                errands: current.errands.map((errand) =>
                    errand.errandId === updatedErrand.errandId
                        ? {
                            ...errand,
                            title: updatedErrand.title,
                            description: updatedErrand.description,
                            status: updatedErrand.status,
                            priority: updatedErrand.priority,
                            assignee: updatedErrand.assignee,
                            customer: updatedErrand.customer,
                            contact: updatedErrand.contact,
                            historyPreview: updatedErrand.history?.slice(0, 2) ?? [],
                        }
                        : errand,
                ),
            };
        });
    };

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setDebouncedQ(filters.q);
        }, 400);

        return () => window.clearTimeout(timeoutId);
    }, [filters.q]);

    useEffect(() => {
        let alive = true;

        const run = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetchErrands({
                    page: 0,
                    size: 20,
                    sortBy: filters.sortBy,
                    sortDir: "desc",
                    ...buildErrandFilterParams({
                        ...filters,
                        q: debouncedQ,
                    }),
                });

                if (alive) {
                    setData(res);
                }
            } catch (e) {
                if (!alive) return;
                setError(e instanceof Error ? e.message : "Unknown error");
            } finally {
                if (alive) {
                    setLoading(false);
                }
            }
        };

        void run();

        return () => {
            alive = false;
        };
    }, [
        filters.sortBy,
        filters.statuses,
        filters.priorities,
        filters.assigneeId,
        filters.customerId,
        debouncedQ,
    ]);

    if (loading) return <div className="p-6">Laddar ärenden…</div>;
    if (error) return <div className="p-6 text-red-600">Fel: {error}</div>;
    if (!data) return <div className="p-6">Inga ärenden hittades.</div>;

    return (
        <div className="min-h-screen bg-stone-100">
            <div className="mx-auto max-w-7xl px-4 pb-10 pt-24">
                <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Ärenden
                    </h1>

                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            type="button"
                            onClick={() => navigate("/errands/new")}
                            className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-[#0A1633] px-20 py-3 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(10,22,51,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#13224A] hover:shadow-[0_10px_24px_rgba(10,22,51,0.35)]"
                        >
                            Skapa ärende
                        </button>

                        <div className="inline-flex rounded-full border border-slate-300 bg-white p-1 shadow-sm">
                            <button
                                type="button"
                                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                                    view === "list"
                                        ? "bg-slate-900 text-white"
                                        : "text-slate-700 hover:bg-slate-100"
                                }`}
                                onClick={() => setView("list")}
                            >
                                Lista
                            </button>
                            <button
                                type="button"
                                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                                    view === "cards"
                                        ? "bg-slate-900 text-white"
                                        : "text-slate-700 hover:bg-slate-100"
                                }`}
                                onClick={() => setView("cards")}
                            >
                                Kort
                            </button>
                        </div>
                    </div>
                </div>

                {isFilterPanelOpen ? (
                    <FilterPanel
                        filters={filters}
                        onChange={setFilters}
                        onClear={() => setFilters(initialErrandFilters)}
                        onClose={() => setIsFilterPanelOpen(false)}
                        customers={[]}
                        assignees={[]}
                    />
                ) : (
                    <div className="mb-6 flex items-center justify-between gap-4">
                        <button
                            type="button"
                            onClick={() => {
                                setFilters((current) => ({ ...current, q: "" }));
                                setIsFilterPanelOpen(true);
                            }}
                            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                        >
                            Visa filter
                        </button>

                        <div className="flex-1">
                            <input
                                type="text"
                                value={filters.q}
                                onChange={(event) =>
                                    setFilters((current) => ({ ...current, q: event.target.value }))
                                }
                                placeholder="Sök ärende..."
                                className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-center text-sm text-slate-700 shadow-sm outline-none placeholder:text-slate-400"
                            />
                        </div>
                    </div>
                )}

                {data.errands.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                        Inga ärenden matchar sökningen
                    </div>
                ) : view === "cards" ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {data.errands.map((e) => (
                            <ErrandCard key={e.errandId} errand={e} onOpen={openModal} />
                        ))}
                    </div>
                ) : (
                    <ul className="m-0 list-none space-y-3 p-0">
                        {data.errands.map((e) => (
                            <li key={e.errandId}>
                                <ErrandListRow errand={e} onOpen={openModal} />
                            </li>
                        ))}
                    </ul>
                )}

                {selectedErrandId !== null && (
                    <ErrandDetailsModal
                        errandId={selectedErrandId}
                        onClose={closeModal}
                        onErrandUpdated={handleErrandUpdated}
                    />
                )}
            </div>
        </div>
    );
}