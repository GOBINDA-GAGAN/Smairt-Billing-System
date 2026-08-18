import { Search, RotateCcw, CalendarDays } from "lucide-react";

const BillToolbar = ({ search, setSearch, paymentStatus, setPaymentStatus, date, setDate, month, setMonth, year, setYear, onReset }) => {
  return (
    <div className="flex w-full flex-col gap-3 rounded-md border border-slate-200 bg-white p-3 xl:flex-row xl:items-end xl:gap-4">

      {/* Search - 55% */}
      <div className="w-full xl:w-[40%]">
        <label className="mb-1 block text-xs font-medium text-slate-600">Search Bills</label>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search customer name, mobile number or bill number..." className="h-9 w-full rounded-md border border-slate-200 pl-9 pr-3 text-sm outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500/20" />
        </div>
      </div>

      {/* Payment Tabs */}
      <div className="w-full xl:w-auto">
        <label className="mb-1 block text-xs font-medium text-slate-600">Payment</label>
        <div className="flex h-9 rounded-md border border-slate-200 bg-slate-50 p-0.5">
          {[
            { label: "All", value: "" },
            { label: "Paid", value: "PAID" },
            { label: "Pending", value: "PENDING" },
            { label: "Partial", value: "PARTIAL" },
          ].map((item) => (
            <button key={item.value} type="button" onClick={() => setPaymentStatus(item.value)} className={`rounded px-3 text-xs font-medium transition ${paymentStatus === item.value ? "bg-green-600 text-white shadow-sm" : "text-slate-500 hover:bg-white hover:text-slate-700"}`}>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right Filters */}
      <div className="flex w-full flex-col gap-2 sm:flex-row xl:ml-auto xl:w-auto">
        <div className="relative w-full sm:w-32">
          <CalendarDays size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-9 w-full rounded-md border border-slate-200 bg-white pl-8 pr-2 text-xs outline-none focus:border-green-500" />
        </div>

        <select value={month} onChange={(e) => setMonth(e.target.value)} className="h-9 w-full rounded-md border border-slate-200 bg-white px-2 text-xs outline-none focus:border-green-500 sm:w-24">
          <option value="">Month</option>
          <option value="01">Jan</option>
          <option value="02">Feb</option>
          <option value="03">Mar</option>
          <option value="04">Apr</option>
          <option value="05">May</option>
          <option value="06">Jun</option>
          <option value="07">Jul</option>
          <option value="08">Aug</option>
          <option value="09">Sep</option>
          <option value="10">Oct</option>
          <option value="11">Nov</option>
          <option value="12">Dec</option>
        </select>

        <select value={year} onChange={(e) => setYear(e.target.value)} className="h-9 w-full rounded-md border border-slate-200 bg-white px-2 text-xs outline-none focus:border-green-500 sm:w-20">
          <option value="">Year</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>

        <button type="button" onClick={onReset} className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
          <RotateCcw size={14} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default BillToolbar;