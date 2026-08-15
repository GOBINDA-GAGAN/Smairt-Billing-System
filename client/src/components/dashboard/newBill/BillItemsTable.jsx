import React from "react";
import { Minus, Plus, Trash2, Package } from "lucide-react";

const BillItemsTable = ({
  items = [],
  onIncrease,
  onDecrease,
  onRemove,
  onDiscountChange,
}) => {
  const formatCurrency = (value) => {
    return `₹${Number(value).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card">
      {/* Header */}
      <div className="border-b border-border px-3 py-2.5">
        <h2 className="text-xs font-semibold">Bill Items</h2>

        <p className="mt-0.5 text-[9px] text-secondary">
          Review products, quantity and discounts.
        </p>
      </div>

      {/* Table */}
      <div className="w-full">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="w-[32%] px-3 py-2.5 text-[9px] font-medium text-secondary">
                Product
              </th>

              <th className="w-[13%] px-2 py-2.5 text-[9px] font-medium text-secondary">
                Price
              </th>

              <th className="w-[17%] px-2 py-2.5 text-[9px] font-medium text-secondary">
                Qty
              </th>

              <th className="w-[13%] px-2 py-2.5 text-[9px] font-medium text-secondary">
                Discount
              </th>

              <th className="w-[15%] px-2 py-2.5 text-[9px] font-medium text-secondary">
                Total
              </th>

              <th className="w-10 px-2 py-2.5" />
            </tr>
          </thead>

          <tbody>
            {items.map((item) => {
              const subtotal = Number(item.price) * Number(item.quantity);

              const discountAmount =
                (subtotal * Number(item.discount || 0)) / 100;

              const total = subtotal - discountAmount;

              return (
                <tr
                  key={item.id}
                  className="
                border-b border-border
                last:border-b-0
                transition-colors
                hover:bg-muted/30
              "
                >
                  {/* Product */}
                  <td className="px-3 py-2.5">
                    <div className="flex min-w-0 items-center gap-2">
                      <div
                        className="
                      flex h-8 w-8 shrink-0
                      items-center justify-center
                      rounded-md
                      border border-border
                      bg-background
                      text-secondary
                    "
                      >
                        <Package size={13} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-[10px] font-medium">
                          {item.name}
                        </p>

                        <p className="mt-0.5 truncate text-[8px] text-secondary">
                          {item.sku}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-2 py-2.5 text-[10px]">
                    {formatCurrency(item.price)}
                  </td>

                  {/* Quantity */}
                  <td className="px-2 py-2.5">
                    <div className="flex h-6 w-fit items-center rounded-md border border-border">
                      <button
                        type="button"
                        onClick={() => onDecrease(item.id)}
                        className="
                      flex h-full w-6
                      items-center justify-center
                      text-secondary
                      hover:bg-muted
                    "
                      >
                        <Minus size={10} />
                      </button>

                      <span className="w-6 text-center text-[10px] font-medium">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => onIncrease(item.id)}
                        className="
                      flex h-full w-6
                      items-center justify-center
                      text-secondary
                      hover:bg-muted
                    "
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </td>

                  {/* Discount */}
                  <td className="px-2 py-2.5">
                    <div className="relative w-14">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={item.discount ?? 0}
                        onChange={(event) =>
                          onDiscountChange(item.id, event.target.value)
                        }
                        className="
                      h-6 w-full rounded-md
                      border border-border
                      bg-background
                      px-1.5 pr-4
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
                  </td>

                  {/* Total */}
                  <td className="px-2 py-2.5">
                    <p className="truncate text-[10px] font-semibold">
                      {formatCurrency(total)}
                    </p>

                    {discountAmount > 0 && (
                      <p className="truncate text-[8px] text-red-500">
                        -{formatCurrency(discountAmount)}
                      </p>
                    )}
                  </td>

                  {/* Remove */}
                  <td className="px-2 py-2.5">
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      className="
                    flex h-6 w-6
                    items-center justify-center
                    rounded-md
                    text-secondary
                    hover:bg-red-500/10
                    hover:text-red-500
                  "
                      title="Remove product"
                    >
                      <Trash2 size={11} />
                    </button>
                  </td>
                </tr>
              );
            })}

            {/* Empty */}
            {items.length === 0 && (
              <tr>
                <td colSpan="6" className="px-3 py-10 text-center">
                  <Package size={18} className="mx-auto text-secondary" />

                  <p className="mt-2 text-[10px] font-medium">
                    No products added
                  </p>

                  <p className="mt-1 text-[9px] text-secondary">
                    Search and add products above.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Item count */}
      {items.length > 0 && (
        <div className="border-t border-border px-3 py-2">
          <p className="text-[9px] text-secondary">
            {items.length} {items.length === 1 ? "product" : "products"} added
          </p>
        </div>
      )}
    </section>
  );
};

export default BillItemsTable;
