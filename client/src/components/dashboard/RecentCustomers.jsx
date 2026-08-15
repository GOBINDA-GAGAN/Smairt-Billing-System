import React from "react";

const RecentCustomers = ({ data = [] }) => {
  return (
    <div className="w-full overflow-hidden rounded-lg sm:rounded-xl border border-secondary bg-card">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-secondary px-3 py-3 sm:px-5 sm:py-4">
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-primary sm:text-base">
            Recent Customers
          </h2>

          <p className="mt-0.5 truncate text-[10px] text-secondary sm:mt-1 sm:text-xs">
            Latest customer transactions
          </p>
        </div>

        <button
          className="
        shrink-0
        text-[10px]
        font-medium
        text-secondary
        transition
        hover:text-primary
        sm:text-sm
      "
        >
          View all →
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[750px]">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-3 py-2 text-[9px] font-semibold text-secondary sm:px-4 sm:py-2.5 sm:text-[10px]">
                Invoice
              </th>

              <th className="px-3 py-2 text-[9px] font-semibold text-secondary sm:px-4 sm:py-2.5 sm:text-[10px]">
                Customer
              </th>

              <th className="px-3 py-2 text-[9px] font-semibold text-secondary sm:px-4 sm:py-2.5 sm:text-[10px]">
                Date
              </th>

              <th className="px-3 py-2 text-[9px] font-semibold text-secondary sm:px-4 sm:py-2.5 sm:text-[10px]">
                Items
              </th>

              <th className="px-3 py-2 text-[9px] font-semibold text-secondary sm:px-4 sm:py-2.5 sm:text-[10px]">
                Total
              </th>

              <th className="px-3 py-2 text-[9px] font-semibold text-secondary sm:px-4 sm:py-2.5 sm:text-[10px]">
                Payment
              </th>

              <th className="px-3 py-2 text-[9px] font-semibold text-secondary sm:px-4 sm:py-2.5 sm:text-[10px]">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((invoice) => (
              <tr
                key={invoice.id}
                className="
              border-b border-border
              transition-colors
              hover:bg-muted/30
            "
              >
                {/* Invoice */}
                <td className="px-3 py-2 sm:px-4 sm:py-2.5">
                  <span className="text-[10px] font-semibold text-primary sm:text-xs">
                    {invoice.id}
                  </span>
                </td>

                {/* Customer */}
                <td className="px-3 py-2 sm:px-4 sm:py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-semibold text-foreground sm:text-xs">
                      {invoice.customerName}
                    </p>

                    <p className="mt-0.5 text-[9px] text-secondary sm:text-[10px]">
                      {invoice.mobile}
                    </p>
                  </div>
                </td>

                {/* Date */}
                <td className="whitespace-nowrap px-3 py-2 text-[10px] text-secondary sm:px-4 sm:py-2.5 sm:text-xs">
                  {invoice.date}
                </td>

                {/* Items */}
                <td className="px-3 py-2 text-[10px] text-secondary sm:px-4 sm:py-2.5 sm:text-xs">
                  {invoice.items}
                </td>

                {/* Total */}
                <td className="px-3 py-2 sm:px-4 sm:py-2.5">
                  <span className="whitespace-nowrap text-[10px] font-semibold text-foreground sm:text-xs">
                    ₹{invoice.total.toLocaleString("en-IN")}
                  </span>

                  {invoice.due > 0 && (
                    <p className="mt-0.5 whitespace-nowrap text-[9px] font-medium text-red-500 sm:text-[10px]">
                      Due ₹{invoice.due.toLocaleString("en-IN")}
                    </p>
                  )}
                </td>

                {/* Payment */}
                <td className="px-3 py-2 sm:px-4 sm:py-2.5">
                  <span className="text-[10px] text-secondary sm:text-xs">
                    {invoice.paymentMode}
                  </span>
                </td>

                {/* Status */}
                <td className="px-3 py-2 sm:px-4 sm:py-2.5">
                  <span
                    className={`
                  inline-flex
                  rounded-md
                  px-1.5 py-0.5
                  text-[8px]
                  font-medium
                  sm:px-2 sm:py-1 sm:text-[9px]
                  ${
                    invoice.status === "Paid"
                      ? "bg-green-500/10 text-green-600"
                      : invoice.status === "Pending"
                        ? "bg-orange-500/10 text-orange-500"
                        : "bg-red-500/10 text-red-500"
                  }
                `}
                  >
                    {invoice.status}
                  </span>
                </td>
              </tr>
            ))}

            {/* Empty State */}
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 py-8 text-center text-[10px] text-secondary sm:px-4 sm:py-10 sm:text-xs"
                >
                  No recent invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentCustomers;
