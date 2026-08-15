import React, { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { dashboardFilters, salesChart } from "../../constants/dashboardData";
import SalesChartGraph from "./graph/SalesChartGraph";

const SalesChart = () => {
   const [period, setPeriod] = useState("today");


  return (
    <div
  className="
    w-full min-w-0 overflow-hidden
    rounded-lg sm:rounded-xl
    border border-secondary
    bg-card
    p-3 sm:p-4 lg:p-5
  "
>
  {/* Header */}
  <div
    className="
      mb-4
      flex flex-col gap-3
      sm:mb-5
      sm:flex-row sm:items-center sm:justify-between
    "
  >
    {/* Title */}
    <div className="min-w-0">
      <h2
        className="
          truncate
          text-sm font-semibold
          text-primary
          sm:text-base
        "
      >
        Sales Overview
      </h2>

      <p className="mt-0.5 text-[10px] text-secondary sm:mt-1 sm:text-xs">
        Track your sales performance
      </p>
    </div>

    {/* Filter */}
    <select
      name="period"
      value={period}
      onChange={(e) => setPeriod(e.target.value)}
      className="
        w-full
        rounded-md
        border border-border
        bg-card
        px-2.5 py-2
        text-xs font-medium
        text-foreground
        outline-none
        transition
        focus:border-primary
        focus:ring-2
        focus:ring-primary/10

        sm:w-auto
        sm:min-w-[120px]
        sm:px-3
        sm:text-sm
      "
    >
      {dashboardFilters.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>

  {/* Chart */}
  <div className="w-full min-w-0 overflow-hidden">
    <SalesChartGraph />
  </div>
</div>
  );
};

export default SalesChart;