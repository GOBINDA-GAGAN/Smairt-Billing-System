import React from "react";
import { ArrowLeft, Phone, MessageCircle, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BillDetails = () => {
  const navigate = useNavigate();

  const bill = {
    billNo: "BILL-2026-0818-014",
    date: "18 Aug 2026",
    time: "06:18 PM",
    customerName: "Rahul Kumar",
    mobile: "9876543210",
    items: [
      { name: "Aashirvaad Atta", qty: "5 kg", price: 65, amount: 325 },
      { name: "Milk", qty: "2 L", price: 60, amount: 120 },
      { name: "Biscuits", qty: "2 pkt", price: 20, amount: 40 },
      { name: "Soap", qty: "2 pcs", price: 25, amount: 50 },
      { name: "Shampoo", qty: "1 btl", price: 25, amount: 25 },
    ],
    subtotal: 560,
    discount: 10,
    total: 550,
    paid: 400,
    due: 150,
    paymentMethod: "Cash",
    status: "PARTIAL",
  };

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-5">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            >
              <ArrowLeft size={17} />
            </button>

            <div>
              <h1 className="text-lg font-semibold text-slate-900">
                Bill Details
              </h1>
              <p className="text-xs text-slate-500">
                #{bill.billNo}
              </p>
            </div>
          </div>

          <span className="rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700">
            {bill.status}
          </span>
        </div>

        {/* Bill */}
        <div className="overflow-hidden rounded-md border border-slate-200 bg-white">

          {/* Customer */}
          <div className="border-b border-slate-200 p-4">
            <div className="flex flex-col justify-between gap-4 sm:flex-row">

              <div>
                <p className="mb-1 text-xs text-slate-400">
                  Customer
                </p>

                <h2 className="text-sm font-semibold text-slate-900">
                  {bill.customerName}
                </h2>

                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                  <Phone size={13} />
                  {bill.mobile}
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-xs text-slate-400">
                  Bill Date
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {bill.date}
                </p>

                <p className="text-xs text-slate-400">
                  {bill.time}
                </p>
              </div>

            </div>
          </div>

          {/* Items */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">
                    Product
                  </th>

                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500">
                    Qty
                  </th>

                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500">
                    Price
                  </th>

                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {bill.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {item.name}
                    </td>

                    <td className="px-4 py-3 text-center text-sm text-slate-600">
                      {item.qty}
                    </td>

                    <td className="px-4 py-3 text-right text-sm text-slate-600">
                      ₹{item.price}
                    </td>

                    <td className="px-4 py-3 text-right text-sm font-medium text-slate-800">
                      ₹{item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="border-t border-slate-200 p-4">
            <div className="ml-auto w-full max-w-sm space-y-2">

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="text-slate-700">
                  ₹{bill.subtotal}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Discount</span>
                <span className="text-green-600">
                  -₹{bill.discount}
                </span>
              </div>

              <div className="flex justify-between border-t border-slate-100 pt-2">
                <span className="font-semibold text-slate-800">
                  Total
                </span>

                <span className="font-bold text-slate-900">
                  ₹{bill.total}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Paid</span>
                <span className="font-medium text-green-600">
                  ₹{bill.paid}
                </span>
              </div>

              <div className="flex justify-between rounded-md bg-red-50 p-2.5">
                <span className="text-sm font-medium text-red-700">
                  Due
                </span>

                <span className="text-sm font-bold text-red-700">
                  ₹{bill.due}
                </span>
              </div>

              <div className="flex justify-between pt-1 text-sm">
                <span className="text-slate-500">
                  Payment Method
                </span>

                <span className="font-medium text-slate-700">
                  {bill.paymentMethod}
                </span>
              </div>

            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 border-t border-slate-200 bg-slate-50 p-4 sm:flex-row sm:justify-end">

            <button
              onClick={() => window.print()}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-600 hover:bg-slate-100"
            >
              <Printer size={15} />
              Print
            </button>

            <button
              className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-green-600 px-4 text-xs font-medium text-white hover:bg-green-700"
            >
              <MessageCircle size={15} />
              WhatsApp
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default BillDetails;