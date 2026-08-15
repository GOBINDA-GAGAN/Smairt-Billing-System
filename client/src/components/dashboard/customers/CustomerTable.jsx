import React from "react";
import CustomerRow from "./CustomerRow";

const CustomerTable = ({ customers, onEdit }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[900px]">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="px-4 py-2.5 text-[10px] font-semibold text-secondary">
              Customer
            </th>

            <th className="px-4 py-2.5 text-[10px] font-semibold text-secondary">
              Email
            </th>

            <th className="px-4 py-2.5 text-[10px] font-semibold text-secondary">
              Total
            </th>

            <th className="px-4 py-2.5 text-[10px] font-semibold text-secondary">
              Paid
            </th>

            <th className="px-4 py-2.5 text-[10px] font-semibold text-secondary">
              Due
            </th>

            <th className="px-4 py-2.5 text-[10px] font-semibold text-secondary">
              Status
            </th>

            <th className="px-4 py-2.5 text-[10px] font-semibold text-secondary">
              WhatsApp
            </th>

            <th className="px-4 py-2.5 text-[10px] font-semibold text-secondary">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <CustomerRow
                key={customer.id}
                customer={customer}
                onEdit={onEdit}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className="px-4 py-10 text-center text-xs text-secondary"
              >
                No customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
