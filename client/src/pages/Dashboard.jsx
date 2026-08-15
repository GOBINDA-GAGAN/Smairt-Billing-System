import React, { useState } from "react";
import StatCard from "../components/dashboard/StatCard";
import {
  dashboardFilters,
  recentBillsData,
  statCardsData,
} from "../constants/dashboardData";
import RecentCustomers from "../components/dashboard/RecentCustomers";
import SalesChart from "../components/dashboard/SalesChart";

const Dashboard = () => {
  const [period, setPeriod] = useState("today");

  return (
    <div className="w-full bg-background text-foreground space-y-3 sm:space-y-4">
      {/* Filter */}
      <section className="flex justify-end">
        <select
          name="period"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="
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
        sm:px-3
        sm:py-2
        sm:text-sm
      "
        >
          {dashboardFilters.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </section>

      {/* Stat Cards */}
      <section className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4 lg:gap-4">
        {statCardsData.map((card) => (
          <StatCard key={card.id} {...card} />
        ))}
      </section>

      {/* Sales Chart */}
      <section className="w-full min-w-0 overflow-hidden">
        <SalesChart />
      </section>

      {/* Recent Customers */}
      <section className="w-full min-w-0 overflow-hidden">
        <RecentCustomers data={recentBillsData} />
      </section>
    </div>
  );
};

export default Dashboard;
