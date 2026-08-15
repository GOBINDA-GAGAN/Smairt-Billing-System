import React from "react";
import { Search } from "lucide-react";

const CustomerToolbar = ({
  search,
  setSearch,
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Paid",
      value: "paid",
    },
    {
      label: "Due",
      value: "due",
    },
  ];

  return (
    <div className="flex flex-col gap-3 border-b border-border p-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative w-full sm:max-w-xs">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customer..."
          className="
            h-8 w-full rounded-md
            border border-border
            bg-background
            pl-9 pr-3
            text-xs text-foreground
            outline-none
            placeholder:text-secondary
            focus:border-primary
          "
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center rounded-md border border-border bg-background p-0.5">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={`
              rounded-sm px-3 py-1.5
              text-[10px] font-medium
              transition-all
              ${
                activeTab === tab.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-secondary hover:text-foreground"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomerToolbar;