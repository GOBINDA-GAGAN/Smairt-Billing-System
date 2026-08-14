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
            <tr className="border-b border-secondary/20 text-left">
              <th className="px-5 py-3 text-xs font-medium text-secondary">
                Invoice
              </th>

              <th className="px-5 py-3 text-xs font-medium text-secondary">
                Customer
              </th>

              <th className="px-5 py-3 text-xs font-medium text-secondary">
                Date
              </th>

              <th className="px-5 py-3 text-xs font-medium text-secondary">
                Items
              </th>

              <th className="px-5 py-3 text-xs font-medium text-secondary">
                Total
              </th>

              <th className="px-5 py-3 text-xs font-medium text-secondary">
                Payment
              </th>

              <th className="px-5 py-3 text-xs font-medium text-secondary">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b border-secondary/10 transition hover:bg-secondary/5"
              >
                {/* Invoice */}
                <td className="px-5 py-4">
                  <span className="text-sm font-medium text-primary">
                    {invoice.id}
                  </span>
                </td>

                {/* Customer */}
                <td className="px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-primary">
                      {invoice.customerName}
                    </p>

                    <p className="mt-0.5 text-xs text-secondary">
                      {invoice.mobile}
                    </p>
                  </div>
                </td>

                {/* Date */}
                <td className="px-5 py-4 text-sm text-secondary">
                  {invoice.date}
                </td>

                {/* Items */}
                <td className="px-5 py-4 text-sm text-secondary">
                  {invoice.items}
                </td>

                {/* Total */}
                <td className="px-5 py-4">
                  <span className="text-sm font-semibold text-primary">
                    ₹{invoice.total.toLocaleString("en-IN")}
                  </span>

                  {invoice.due > 0 && (
                    <p className="mt-0.5 text-xs text-red-400">
                      Due ₹{invoice.due.toLocaleString("en-IN")}
                    </p>
                  )}
                </td>

                {/* Payment */}
                <td className="px-5 py-4">
                  <span className="text-sm text-secondary">
                    {invoice.paymentMode}
                  </span>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      invoice.status === "Paid"
                        ? "bg-green-500/10 text-green-400"
                        : invoice.status === "Pending"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-red-500/10 text-red-400"
                    }`}
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
                  colSpan="7"
                  className="px-5 py-10 text-center text-sm text-secondary"
                >
                  No recent customers found.
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
