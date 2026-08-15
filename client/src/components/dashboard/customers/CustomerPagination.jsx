import React from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const CustomerPagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  totalCustomers,
  pageSize,
}) => {
  const start =
    totalCustomers === 0
      ? 0
      : (currentPage - 1) * pageSize + 1;

  const end = Math.min(
    currentPage * pageSize,
    totalCustomers
  );

  return (
    <div className="flex flex-col gap-3 border-t border-border px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[10px] text-secondary">
        Showing {start} to {end} of {totalCustomers} customers
      </p>

      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage((page) => page - 1)
          }
          className="
            flex h-7 w-7 items-center justify-center
            rounded-md border border-border
            text-secondary
            transition-colors
            hover:bg-muted
            disabled:pointer-events-none
            disabled:opacity-40
          "
        >
          <ChevronLeft size={13} />
        </button>

        {/* Pages */}
        {Array.from(
          { length: Math.min(totalPages, 5) },
          (_, index) => index + 1
        ).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => setCurrentPage(page)}
            className={`
              flex h-7 w-7 items-center justify-center
              rounded-md
              text-[10px] font-medium
              transition-colors
              ${
                currentPage === page
                  ? "bg-primary/10 text-primary"
                  : "text-secondary hover:bg-muted"
              }
            `}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((page) => page + 1)
          }
          className="
            flex h-7 w-7 items-center justify-center
            rounded-md border border-border
            text-secondary
            transition-colors
            hover:bg-muted
            disabled:pointer-events-none
            disabled:opacity-40
          "
        >
          <ChevronRight size={13} />
        </button>

        {/* Page Size */}
        <select
          defaultValue={pageSize}
          className="
            ml-1 h-7 rounded-md
            border border-border
            bg-background
            px-2
            text-[10px] text-foreground
            outline-none
          "
        >
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={50}>50 / page</option>
        </select>
      </div>
    </div>
  );
};

export default CustomerPagination;