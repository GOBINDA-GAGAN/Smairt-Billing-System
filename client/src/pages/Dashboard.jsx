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
  console.log(statCardsData);
  const [period, setPeriod] = useState("today");

  return (
    <div className="bg-background text-foreground space-y-3">
      <section className="flex justify-end">
        <select
          name="period"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
        >
          {dashboardFilters.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </section>

      {/* start card */}
      <section className="grid grid-cols-4 gap-4">
        {statCardsData.map((card) => {
          return <StatCard key={card.id} {...card} />;
        })}
      </section>

      <section>
        <SalesChart />
      </section>

      {/* resent Customer */}
      <section>
        <RecentCustomers data={recentBillsData} />
      </section>
    </div>
  );
};

export default Dashboard;
