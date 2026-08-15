import React from "react";

const BillSummary = ({
  items = [],
  taxRate = 5,
  onTaxRateChange,
  discount = 0,
  onDiscountChange,
}) => {
  const subtotal = items.reduce((total, item) => {
    return (
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0)
    );
  }, 0);

  const itemDiscount = items.reduce((total, item) => {
    const itemSubtotal =
      Number(item.price || 0) *
      Number(item.quantity || 0);

    return (
      total +
      (itemSubtotal *
        Number(item.discount || 0)) /
        100
    );
  }, 0);

  const billDiscount =
    (subtotal * Number(discount || 0)) / 100;

  const taxableAmount =
    subtotal - itemDiscount - billDiscount;

  const tax =
    (taxableAmount * Number(taxRate || 0)) / 100;

  const grandTotal = taxableAmount + tax;

  const formatCurrency = (value) => {
    return `₹${Number(value).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <section className="rounded-lg border border-border bg-card">
      {/* Header */}

      <div className="border-b border-border px-4 py-3">
        <h2 className="text-xs font-semibold">
          Bill Summary
        </h2>

        <p className="mt-0.5 text-[9px] text-secondary">
          Review the final bill amount.
        </p>
      </div>

      <div className="space-y-3 p-4">
        {/* Subtotal */}

        <div className="flex items-center justify-between">
          <span className="text-xs text-secondary">
            Subtotal
          </span>

          <span className="text-xs font-medium">
            {formatCurrency(subtotal)}
          </span>
        </div>

        {/* Product Discount */}

        <div className="flex items-center justify-between">
          <span className="text-xs text-secondary">
            Product Discount
          </span>

          <span className="text-xs text-red-500">
            -{formatCurrency(itemDiscount)}
          </span>
        </div>

        {/* Bill Discount */}

        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-secondary">
            Bill Discount
          </span>

          <div className="relative w-16">
            <input
              type="number"
              min="0"
              max="100"
              value={discount}
              onChange={(event) =>
                onDiscountChange?.(
                  event.target.value
                )
              }
              className="
                h-7 w-full rounded-md
                border border-border
                bg-background
                px-2 pr-5
                text-right text-[9px]
                outline-none
                focus:border-primary
              "
            />

            <span
              className="
                absolute right-1.5
                top-1/2
                -translate-y-1/2
                text-[8px]
                text-secondary
              "
            >
              %
            </span>
          </div>
        </div>

        {/* Bill Discount Amount */}

        {billDiscount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-secondary">
              Discount Amount
            </span>

            <span className="text-[10px] text-red-500">
              -{formatCurrency(billDiscount)}
            </span>
          </div>
        )}

        {/* Tax */}

        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-secondary">
            Tax
          </span>

          <div className="flex items-center gap-2">
            <div className="relative w-16">
              <input
                type="number"
                min="0"
                max="100"
                value={taxRate}
                onChange={(event) =>
                  onTaxRateChange?.(
                    event.target.value
                  )
                }
                className="
                  h-7 w-full rounded-md
                  border border-border
                  bg-background
                  px-2 pr-5
                  text-right text-[9px]
                  outline-none
                  focus:border-primary
                "
              />

              <span
                className="
                  absolute right-1.5
                  top-1/2
                  -translate-y-1/2
                  text-[8px]
                  text-secondary
                "
              >
                %
              </span>
            </div>

            <span className="text-[10px] text-secondary">
              {formatCurrency(tax)}
            </span>
          </div>
        </div>

        {/* Divider */}

        <div className="border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">
              Grand Total
            </span>

            <span className="text-lg font-bold text-primary">
              {formatCurrency(grandTotal)}
            </span>
          </div>
        </div>

        {/* Item Count */}

        <div className="rounded-md bg-muted/40 px-3 py-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-secondary">
              Total Items
            </span>

            <span className="text-[10px] font-medium">
              {items.reduce(
                (total, item) =>
                  total +
                  Number(item.quantity || 0),
                0
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BillSummary;