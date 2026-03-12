import type { ReportListItem } from "../types/reports";
import { getPriorityStyles } from "../utils/priorityStyles";

const safe = (value?: string | null) =>
    value && value.trim().length > 0 ? value : "—";

const formatMoney = (value: number) =>
    new Intl.NumberFormat("sv-SE", {
        style: "currency",
        currency: "SEK",
        maximumFractionDigits: 0,
    }).format(value);

const formatDate = (iso?: string | null) => {
    if (!iso) return "—";

    return new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
};

export const ReportListRow = ({ report }: { report: ReportListItem }) => {
    const priority = getPriorityStyles(report.priority);

    const contactName = report.contact
        ? `${report.contact.firstName} ${report.contact.lastName}`
        : "—";

    return (
        <article className="border-b border-slate-200 bg-white px-4 py-3 last:border-b-0 sm:px-5">
            <div className="sm:hidden">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold text-slate-900">
                            {safe(report.title)}
                        </div>
                        <div className="mt-0.5 text-xs text-slate-500">
                            Ärende #{String(report.errandId).padStart(3, "0")} · {safe(report.customer?.name)}
                        </div>
                    </div>

                    <span
                        className="inline-flex shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                        style={priority.badgeStyle}
                    >
                        {priority.name}
                    </span>
                </div>

                <div className="mt-1 text-xs text-slate-500">
                    {safe(contactName)}
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
                    <span>{safe(report.status?.name)}</span>
                    <span className="text-slate-400">•</span>
                    <span>{safe(report.assignee?.name)}</span>
                    <span className="text-slate-400">•</span>
                    <span>{report.timeSpent ?? 0} h</span>
                    <span className="text-slate-400">•</span>
                    <span>{formatDate(report.createdAt)}</span>
                </div>

                <div className="mt-3 text-sm">
                    <div className="text-xs font-medium text-slate-500">Överenskommet Pris</div>
                    <div className="font-semibold text-slate-900">
                        {formatMoney(report.totalOutprice)}
                    </div>
                </div>
            </div>

            <div className="hidden grid-cols-[80px_minmax(0,1.6fr)_160px_130px_130px_90px_110px_130px] items-center gap-3 sm:grid">
                <div className="text-sm font-semibold text-slate-900">
                    {String(report.errandId).padStart(3, "0")}
                </div>

                <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-slate-900">
                        {safe(report.title)}
                    </div>
                    <div className="truncate text-xs text-slate-500">
                        {safe(report.customer?.name)} · {safe(contactName)}
                    </div>
                </div>

                <div className="truncate text-sm text-slate-800">
                    {safe(report.assignee?.name)}
                </div>

                <div className="truncate text-sm text-slate-800">
                    {safe(report.status?.name)}
                </div>

                <div>
                    <span
                        className="inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                        style={priority.badgeStyle}
                    >
                        {priority.name}
                    </span>
                </div>

                <div className="text-sm text-slate-800">
                    {report.timeSpent ?? 0} h
                </div>

                <div className="text-sm text-slate-800">
                    {formatDate(report.createdAt)}
                </div>

                <div className="text-sm font-medium text-slate-900">
                    {formatMoney(report.totalOutprice)}
                </div>
            </div>
        </article>
    );
};