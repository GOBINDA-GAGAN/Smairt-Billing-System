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
    <div className="w-full rounded-xl border border-secondary bg-card p-5">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-primary">
            Sales Overview
          </h2>

          <p className="mt-1 text-xs text-secondary">
            Track your sales performance
          </p>
        </div>
    <select
          name="period"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
        >
          {dashboardFilters.map((option,i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <SalesChartGraph/>

   
    </div>
  );
};

export default SalesChart;