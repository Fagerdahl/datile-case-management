type ReportPaginationProps = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export const ReportPagination = ({
                                     page,
                                     totalPages,
                                     onPageChange,
                                 }: ReportPaginationProps) => {
    if (totalPages <= 1) {
        return null;
    }

    const canGoPrev = page > 0;
    const canGoNext = page < totalPages - 1;

    return (
        <div className="mt-5 flex items-center justify-between gap-3">
            <button
                type="button"
                onClick={() => canGoPrev && onPageChange(page - 1)}
                disabled={!canGoPrev}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Föregående
            </button>

            <div className="text-sm text-slate-600">
                Sida {page + 1} av {totalPages}
            </div>

            <button
                type="button"
                onClick={() => canGoNext && onPageChange(page + 1)}
                disabled={!canGoNext}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Nästa
            </button>
        </div>
    );
};