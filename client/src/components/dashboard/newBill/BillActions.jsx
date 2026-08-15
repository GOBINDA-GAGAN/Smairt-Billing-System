import React from "react";
import { FileText, RotateCcw, Check } from "lucide-react";

const BillActions = ({
  items = [],
  customer = null,
  onSaveDraft,
  onGenerateBill,
  onClear,
}) => {
  const canGenerate =
    customer && items.length > 0;

  return (
    <section className="rounded-lg border border-border bg-card">
      <div className="p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          {/* Clear */}

          <button
            type="button"
            onClick={onClear}
            className="
              flex h-9 items-center
              justify-center gap-1.5
              rounded-md
              border border-border
              px-3
              text-xs font-medium
              text-secondary
              transition-colors
              hover:bg-muted
              hover:text-foreground
            "
          >
            <RotateCcw size={13} />

            Clear
          </button>

          <div className="flex gap-2">
            {/* Save Draft */}

            <button
              type="button"
              onClick={onSaveDraft}
              disabled={!items.length}
              className="
                flex h-9 items-center
                justify-center gap-1.5
                rounded-md
                border border-border
                px-3
                text-xs font-medium
                text-secondary
                transition-colors
                hover:bg-muted
                hover:text-foreground
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <FileText size={13} />

              Save Draft
            </button>

            {/* Generate */}

            <button
              type="button"
              onClick={onGenerateBill}
              disabled={!canGenerate}
              className="
                flex h-9 items-center
                justify-center gap-1.5
                rounded-md
                bg-primary
                px-4
                text-xs font-semibold
                text-primary-foreground
                transition-opacity
                hover:opacity-90
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <Check size={14} />

              Generate Bill
            </button>
          </div>
        </div>

        {/* Validation message */}

        {!customer && items.length > 0 && (
          <p className="mt-2 text-[9px] text-yellow-600">
            Select a customer before generating the bill.
          </p>
        )}

        {customer && items.length === 0 && (
          <p className="mt-2 text-[9px] text-yellow-600">
            Add at least one product before generating
            the bill.
          </p>
        )}
      </div>
    </section>
  );
};

export default BillActions;