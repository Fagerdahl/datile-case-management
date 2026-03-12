import type { ReactNode } from "react";
import {
    type ReportFilters,
    type ReportSortBy,
    reportSortOptions,
} from "../types/reports";

type Option = {
    value: number;
    label: string;
};

type ReportFilterPanelProps = {
    filters: ReportFilters;
    onChange: (next: ReportFilters) => void;
    onClear: () => void;
    customers: Option[];
    assignees: Option[];
    statuses: Option[];
    priorities: Option[];
};

type SelectFieldProps = {
    value: string;
    onChange: (value: string) => void;
    children: ReactNode;
};

type ChipGroupProps = {
    label: string;
    options: Option[];
    selectedValues: number[];
    onToggle: (value: number) => void;
};

const parseSingleSelectValue = (value: string) => {
    if (value === "") return undefined;
    return Number(value);
};

const toggleNumberValue = (values: number[], value: number) =>
    values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value];

function SelectField({ value, onChange, children }: SelectFieldProps) {
    return (
        <div className="relative min-w-0">
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full appearance-none rounded-full border border-slate-300 bg-white pl-4 pr-10 py-2.5 text-sm text-slate-700 outline-none transition focus:border-slate-400"
            >
                {children}
            </select>

            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
                ▾
            </span>
        </div>
    );
}

function ChipGroup({
                       label,
                       options,
                       selectedValues,
                       onToggle,
                   }: ChipGroupProps) {
    return (
        <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-700">{label}</p>

            <div className="flex flex-wrap gap-2">
                {options.map((option) => {
                    const isActive = selectedValues.includes(option.value);

                    return (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onToggle(option.value)}
                            className={`max-w-full rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                                isActive
                                    ? "border-emerald-300 bg-emerald-200 text-slate-800"
                                    : "border-emerald-200 bg-white text-slate-700 hover:bg-emerald-50"
                            }`}
                        >
                            <span className="block truncate">{option.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export const ReportFilterPanel = ({
                                      filters,
                                      onChange,
                                      onClear,
                                      customers,
                                      assignees,
                                      statuses,
                                      priorities,
                                  }: ReportFilterPanelProps) => {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:p-4 lg:p-5">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-slate-900">Skapa rapport</h2>
                    <p className="text-sm text-slate-500">
                        Justera filter och granska resultatet direkt.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClear}
                    className="inline-flex shrink-0 items-center justify-center self-end rounded-full border border-slate-300 bg-white px-4 py-1 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:self-auto"
                >
                    Rensa filter
                </button>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-6">
                <label className="min-w-0 flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-slate-700">Sökordning</span>
                    <SelectField
                        value={filters.sortBy}
                        onChange={(value) =>
                            onChange({
                                ...filters,
                                sortBy: value as ReportSortBy,
                                page: 0,
                            })
                        }
                    >
                        {reportSortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </SelectField>
                </label>

                <label className="min-w-0 flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-slate-700">Datum från</span>
                    <input
                        type="date"
                        value={filters.dateFrom}
                        onChange={(event) =>
                            onChange({
                                ...filters,
                                dateFrom: event.target.value,
                                page: 0,
                            })
                        }
                        className="w-full rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-slate-400"
                    />
                </label>

                <label className="min-w-0 flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-slate-700">Datum till</span>
                    <input
                        type="date"
                        value={filters.dateTo}
                        onChange={(event) =>
                            onChange({
                                ...filters,
                                dateTo: event.target.value,
                                page: 0,
                            })
                        }
                        className="w-full rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-slate-400"
                    />
                </label>

                <label className="min-w-0 flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-slate-700">Kund</span>
                    <SelectField
                        value={filters.customerId ? String(filters.customerId) : ""}
                        onChange={(value) =>
                            onChange({
                                ...filters,
                                customerId: parseSingleSelectValue(value),
                                page: 0,
                            })
                        }
                    >
                        <option value="">Alla kunder</option>
                        {customers.map((customer) => (
                            <option key={customer.value} value={customer.value}>
                                {customer.label}
                            </option>
                        ))}
                    </SelectField>
                </label>

                <label className="min-w-0 flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-slate-700">Ansvarig</span>
                    <SelectField
                        value={filters.assigneeId ? String(filters.assigneeId) : ""}
                        onChange={(value) =>
                            onChange({
                                ...filters,
                                assigneeId: parseSingleSelectValue(value),
                                page: 0,
                            })
                        }
                    >
                        <option value="">Alla ansvariga</option>
                        {assignees.map((assignee) => (
                            <option key={assignee.value} value={assignee.value}>
                                {assignee.label}
                            </option>
                        ))}
                    </SelectField>
                </label>
            </div>

            <div className="mt-2 space-y-2">
                <ChipGroup
                    label="Prioritet:"
                    options={priorities}
                    selectedValues={filters.priorityIds}
                    onToggle={(value) =>
                        onChange({
                            ...filters,
                            priorityIds: toggleNumberValue(filters.priorityIds, value),
                            page: 0,
                        })
                    }
                />

                <ChipGroup
                    label="Status:"
                    options={statuses}
                    selectedValues={filters.statusIds}
                    onToggle={(value) =>
                        onChange({
                            ...filters,
                            statusIds: toggleNumberValue(filters.statusIds, value),
                            page: 0,
                        })
                    }
                />
            </div>
        </section>
    );
};