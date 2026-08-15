import React from "react";

const RecentCustomers = ({ data = [] }) => {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-secondary bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-secondary px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-primary">
            Recent Customers
          </h2>

          <p className="mt-1 text-xs text-secondary">
            Latest customer transactions
          </p>
        </div>

        <button className="text-sm text-secondary transition hover:text-primary">
          View all →
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-4 py-2.5 text-[10px] font-semibold text-secondary">
                Invoice
              </th>

              <th className="px-4 py-2.5 text-[10px] font-semibold text-secondary">
                Customer
              </th>

              <th className="px-4 py-2.5 text-[10px] font-semibold text-secondary">
                Date
              </th>

              <th className="px-4 py-2.5 text-[10px] font-semibold text-secondary">
                Items
              </th>

              <th className="px-4 py-2.5 text-[10px] font-semibold text-secondary">
                Total
              </th>

              <th className="px-4 py-2.5 text-[10px] font-semibold text-secondary">
                Payment
              </th>

              <th className="px-4 py-2.5 text-[10px] font-semibold text-secondary">
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
                <td className="px-4 py-2.5">
                  <span className="text-xs font-semibold text-primary">
                    {invoice.id}
                  </span>
                </td>

                {/* Customer */}
                <td className="px-4 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-foreground">
                      {invoice.customerName}
                    </p>

                    <p className="mt-0.5 text-[10px] text-secondary">
                      {invoice.mobile}
                    </p>
                  </div>
                </td>

                {/* Date */}
                <td className="px-4 py-2.5 text-xs text-secondary">
                  {invoice.date}
                </td>

                {/* Items */}
                <td className="px-4 py-2.5 text-xs text-secondary">
                  {invoice.items}
                </td>

                {/* Total */}
                <td className="px-4 py-2.5">
                  <span className="text-xs font-semibold text-foreground">
                    ₹{invoice.total.toLocaleString("en-IN")}
                  </span>

                  {invoice.due > 0 && (
                    <p className="mt-0.5 text-[10px] font-medium text-red-500">
                      Due ₹{invoice.due.toLocaleString("en-IN")}
                    </p>
                  )}
                </td>

                {/* Payment */}
                <td className="px-4 py-2.5">
                  <span className="text-xs text-secondary">
                    {invoice.paymentMode}
                  </span>
                </td>

                {/* Status */}
                <td className="px-4 py-2.5">
                  <span
                    className={`
                inline-flex rounded-md
                px-2 py-1
                text-[9px] font-medium
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
                  className="px-4 py-10 text-center text-xs text-secondary"
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
