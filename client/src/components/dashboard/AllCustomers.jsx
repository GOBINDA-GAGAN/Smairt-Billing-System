import React from "react";
import { customersData } from "../../constants/dashboardData";
import { Eye, MessageCircle, Search } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const AllCustomers = () => {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-secondary bg-card">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-secondary/20 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Title */}
        <div>
          <h2 className="text-base font-semibold text-primary">
            All Customers
          </h2>

          <p className="mt-1 text-xs text-secondary">
            Manage all your customers
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
            />

            <input
              type="text"
              placeholder="Search User"
              className=" h-9 w-full rounded-md border border-border bg-secondary/40 
              pl-9 pr-3 text-xs text-foreground outline-none placeholder:text-muted-foreground 
              focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
          {/* Filter */}
          <div className="flex h-9 items-center rounded-lg border border-secondary/20 bg-primary/5 p-1">
            <button
              className="rounded-md bg-primary  px-3 py-1 text-xs 
              font-medium text-popover shadow-sm"
            >
              All
            </button>

            <button
              className=" rounded-md px-3 py-1 text-xs text-secondary transition 
              hover:bg-primary/10 hover:text-primary"
            >
              Paid
            </button>

            <button
              className="rounded-md px-3 py-1 text-xs text-secondary transition 
              hover:bg-red-100 hover:text-red-500"
            >
              Due
            </button>
          </div>

          {/* View All */}
          <button
            className=" h-9 rounded-lg border border-secondary/20 px-3 text-xs 
            font-medium text-primary transition hover:bg-secondary/10"
          >
            View All →
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[850px]">
          <thead>
            <tr className="border-b border-secondary/20 text-left">
              <th className="px-5 py-3 text-xs font-medium text-secondary">
                Customer
              </th>

              <th className="px-5 py-3 text-xs font-medium text-secondary">
                Mobile
              </th>

              <th className="px-5 py-3 text-xs font-medium text-secondary">
                Address
              </th>

              <th className="px-5 py-3 text-xs font-medium text-secondary">
                Total Due
              </th>

              <th className="px-5 py-3 text-xs font-medium text-secondary">
                Action
              </th>
              <th className="px-5 py-3 text-xs font-medium text-secondary">
                WhatsApp
              </th>
            </tr>
          </thead>

          <tbody>
            {customersData.map((customer) => (
              <tr
                key={customer.id}
                className="border-b border-secondary/10 transition hover:bg-secondary/5"
              >
                {/* Customer */}
                <td className="px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-primary">
                      {customer.name}
                    </p>

                    <p className="mt-0.5 text-xs text-secondary">
                      {customer.id}
                    </p>
                  </div>
                </td>

                {/* Mobile */}
                <td className="px-5 py-4 text-sm text-secondary">
                  {customer.mobile}
                </td>

                {/* Address */}
                <td className="px-5 py-4 text-sm text-secondary">
                  {customer.address}
                </td>

                {/* Due */}
                <td className="px-5 py-4">
                  {customer.totalDue > 0 ? (
                    <span className="text-sm font-semibold text-red-400">
                      ₹{customer.totalDue.toLocaleString("en-IN")}
                    </span>
                  ) : (
                    <span className="text-sm text-secondary">No Due</span>
                  )}
                </td>

                {/* Action */}
                <td className="px-5 py-4">
                  <button
                    type="button"
                    className="
                flex h-8 w-8
                items-center justify-center
                rounded-md
                text-secondary
                transition
                hover:bg-secondary/10
                hover:text-primary
              "
                    title="View customer"
                  >
                    <Eye size={16} />
                  </button>
                </td>

                {/* WhatsApp */}
                <td className="px-5 py-4">
                  <button
                    type="button"
                    className="
                flex h-8 w-8
                items-center justify-center
                rounded-md
                text-secondary
                transition
                hover:bg-secondary/10
                hover:text-primary
              "
                    title="WhatsApp customer"
                  >
                   <SiWhatsapp />
                  </button>
                </td>
              </tr>
            ))}

            {/* Empty State */}
            {customersData.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-12 text-center text-sm text-secondary"
                >
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCustomers;
