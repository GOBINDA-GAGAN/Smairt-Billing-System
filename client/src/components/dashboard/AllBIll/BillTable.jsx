import React, { useState } from "react";
import { Eye, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RiWhatsappLine } from "react-icons/ri";

const bills = [
  {
    id: "BILL-2026-0817-001",
    customerName: "Rahul Kumar",
    mobile: "9876543210",
    date: "17 Aug 2026",
    time: "10:42 AM",
    items: 8,
    total: 825,
    paid: 825,
    due: 0,
    paymentMethod: "UPI",
    paymentStatus: "PAID",
  },
  {
    id: "BILL-2026-0818-014",
    customerName: "Rahul Kumar",
    mobile: "9876543210",
    date: "18 Aug 2026",
    time: "06:18 PM",
    items: 5,
    total: 550,
    paid: 400,
    due: 150,
    paymentMethod: "Cash",
    paymentStatus: "PARTIAL",
  },
  {
    id: "BILL-2026-0818-019",
    customerName: "Priya Das",
    mobile: "9123456780",
    date: "18 Aug 2026",
    time: "07:25 PM",
    items: 6,
    total: 740,
    paid: 740,
    due: 0,
    paymentMethod: "UPI",
    paymentStatus: "PAID",
  },
  {
    id: "BILL-2026-0817-001",
    customerName: "Rahul Kumar",
    mobile: "9876543210",
    date: "17 Aug 2026",
    time: "10:42 AM",
    items: 8,
    total: 825,
    paid: 825,
    due: 0,
    paymentMethod: "UPI",
    paymentStatus: "PAID",
  },
  {
    id: "BILL-2026-0818-014",
    customerName: "Rahul Kumar",
    mobile: "9876543210",
    date: "18 Aug 2026",
    time: "06:18 PM",
    items: 5,
    total: 550,
    paid: 400,
    due: 150,
    paymentMethod: "Cash",
    paymentStatus: "PARTIAL",
  },
  {
    id: "BILL-2026-0818-019",
    customerName: "Priya Das",
    mobile: "9123456780",
    date: "18 Aug 2026",
    time: "07:25 PM",
    items: 6,
    total: 740,
    paid: 740,
    due: 0,
    paymentMethod: "UPI",
    paymentStatus: "PAID",
  },
  {
    id: "BILL-2026-0817-001",
    customerName: "Rahul Kumar",
    mobile: "9876543210",
    date: "17 Aug 2026",
    time: "10:42 AM",
    items: 8,
    total: 825,
    paid: 825,
    due: 0,
    paymentMethod: "UPI",
    paymentStatus: "PAID",
  },
  {
    id: "BILL-2026-0818-014",
    customerName: "Rahul Kumar",
    mobile: "9876543210",
    date: "18 Aug 2026",
    time: "06:18 PM",
    items: 5,
    total: 550,
    paid: 400,
    due: 150,
    paymentMethod: "Cash",
    paymentStatus: "PARTIAL",
  },
  {
    id: "BILL-2026-0818-019",
    customerName: "Priya Das",
    mobile: "9123456780",
    date: "18 Aug 2026",
    time: "07:25 PM",
    items: 6,
    total: 740,
    paid: 740,
    due: 0,
    paymentMethod: "UPI",
    paymentStatus: "PAID",
  },
  {
    id: "BILL-2026-0817-001",
    customerName: "Rahul Kumar",
    mobile: "9876543210",
    date: "17 Aug 2026",
    time: "10:42 AM",
    items: 8,
    total: 825,
    paid: 825,
    due: 0,
    paymentMethod: "UPI",
    paymentStatus: "PAID",
  },
  {
    id: "BILL-2026-0818-014",
    customerName: "Rahul Kumar",
    mobile: "9876543210",
    date: "18 Aug 2026",
    time: "06:18 PM",
    items: 5,
    total: 550,
    paid: 400,
    due: 150,
    paymentMethod: "Cash",
    paymentStatus: "PARTIAL",
  },
  {
    id: "BILL-2026-0818-019",
    customerName: "Priya Das",
    mobile: "9123456780",
    date: "18 Aug 2026",
    time: "07:25 PM",
    items: 6,
    total: 740,
    paid: 740,
    due: 0,
    paymentMethod: "UPI",
    paymentStatus: "PAID",
  },
];

const statusStyles = {
  PAID: "border-green-200 bg-green-50 text-green-700",
  PARTIAL: "border-yellow-200 bg-yellow-50 text-yellow-700",
  PENDING: "border-red-200 bg-red-50 text-red-700",
  CANCELLED: "border-slate-200 bg-slate-100 text-slate-600",
};

const BillTable = () => {
  const [selectedBills, setSelectedBills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const billsPerPage = 4;
  const totalBills = bills.length;
  const totalPages = Math.max(1, Math.ceil(totalBills / billsPerPage));
  const startIndex = (currentPage - 1) * billsPerPage;
  const currentBills = bills.slice(startIndex, startIndex + billsPerPage);
  const showingFrom = totalBills === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(startIndex + billsPerPage, totalBills);

  const allSelected =
    currentBills.length > 0 &&
    currentBills.every((bill) => selectedBills.includes(bill.id));

  const toggleBill = (id) => {
    setSelectedBills((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelectedBills((prev) =>
        prev.filter((id) => !currentBills.some((bill) => bill.id === id)),
      );
    } else {
      setSelectedBills((prev) => [
        ...new Set([...prev, ...currentBills.map((bill) => bill.id)]),
      ]);
    }
  };

  const handleWhatsApp = (bill) => {
    const message = `Hello ${bill.customerName}, your bill ${bill.id} total is ₹${bill.total}. Paid ₹${bill.paid}, Due ₹${bill.due}. Thank you.`;
    window.open(
      `https://wa.me/91${bill.mobile}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="w-full overflow-hidden rounded-md border border-slate-200 bg-white">
      <div className="w-full overflow-x-auto">
        <table className="min-w-[1250px] w-full border-collapse">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="w-12 px-4 py-3 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="h-4 w-4 rounded border-slate-300 accent-green-600"
                />
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">
                Bill No.
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">
                Bill Date & Time
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500">
                Items
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500">
                Total Amount
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500">
                Paid
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500">
                Due
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500">
                Payment Method
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500">
                Status
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500">
                WhatsApp
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {currentBills.map((bill) => (
              <tr key={bill.id} className="transition hover:bg-slate-50">
                {/* Checkbox */}
                <td className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectedBills.includes(bill.id)}
                    onChange={() => toggleBill(bill.id)}
                    className="h-4 w-4 rounded border-slate-300 accent-green-600"
                  />
                </td>

                {/* Customer */}
                <td className="px-4 py-3">
                  <div className="whitespace-nowrap">
                    <p className="text-sm font-medium text-slate-800">
                      {bill.customerName}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {bill.mobile}
                    </p>
                  </div>
                </td>

                {/* Bill No */}
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-700">
                  #{bill.id}
                </td>

                {/* Date */}
                <td className="whitespace-nowrap px-4 py-3">
                  <p className="text-sm text-slate-700">{bill.date}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{bill.time}</p>
                </td>

                {/* Items */}
                <td className="px-4 py-3 text-center text-sm text-slate-600">
                  {bill.items}
                </td>

                {/* Total */}
                <td className="px-4 py-3 text-right text-sm font-semibold text-slate-900">
                  ₹{bill.total.toLocaleString("en-IN")}
                </td>

                {/* Paid */}
                <td className="px-4 py-3 text-right text-sm font-medium text-green-600">
                  ₹{bill.paid.toLocaleString("en-IN")}
                </td>

                {/* Due */}
                <td
                  className={`px-4 py-3 text-right text-sm font-semibold ${bill.due > 0 ? "text-red-600" : "text-slate-400"}`}
                >
                  ₹{bill.due.toLocaleString("en-IN")}
                </td>

                {/* Payment Method */}
                <td className="px-4 py-3 text-center text-xs font-medium text-slate-600">
                  {bill.paymentMethod}
                </td>

                {/* Status */}
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${statusStyles[bill.paymentStatus]}`}
                  >
                    {bill.paymentStatus}
                  </span>
                </td>

                {/* WhatsApp */}
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={() => handleWhatsApp(bill)}
                    title="Send WhatsApp"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-green-600 transition hover:bg-green-100 hover:text-green-700"
                  >
                    <RiWhatsappLine  size={17} />
                  </button>
                </td>

                {/* Action: View only */}
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    title="View Bill Details"
                    onClick={() => navigate(`/bills/${bill.id}`)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition hover:bg-green-50 hover:text-green-600"
                  >
                    <Eye size={17} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Pagination */}
      <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          Showing{" "}
          <span className="font-medium text-slate-700">{showingFrom}</span> to{" "}
          <span className="font-medium text-slate-700">{showingTo}</span> of{" "}
          <span className="font-medium text-slate-700">{totalBills}</span> bills
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="inline-flex h-8 items-center gap-1 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={14} />
            Previous
          </button>

          <span className="flex h-8 min-w-8 items-center justify-center rounded-md bg-green-600 px-2 text-xs font-medium text-white">
            {currentPage}
          </span>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="inline-flex h-8 items-center gap-1 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillTable;
