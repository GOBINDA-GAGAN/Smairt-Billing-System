import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { salesChart } from "../../../constants/dashboardData";

const SalesChartGraph = ({ isAnimationActive = true }) => {
  const [range, setRange] = useState("today");

  const chartData = salesChart[range];

  const ranges = [
    { value: "today", label: "Today" },
    { value: "week", label: "7 Days" },
    { value: "month", label: "30 Days" },
    { value: "year", label: "1 Year" },
  ];

  return (
    <div
      className="
    w-full min-w-0 overflow-hidden
    rounded-lg sm:rounded-xl
    border border-secondary/20
    bg-primary/5
    p-2 sm:p-4 lg:p-5
  "
    >
      <AreaChart
        style={{
          width: "100%",
          maxWidth: "100%",
          maxHeight: "320px",
          aspectRatio: 1.8,
        }}
        responsive
        data={chartData}
        margin={{
          top: 5,
          right: 5,
          left: 0,
          bottom: 0,
        }}
      >
        {/* Gradient */}
        <defs>
          <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-primary)"
              stopOpacity={0.3}
            />

            <stop
              offset="95%"
              stopColor="var(--color-primary)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        {/* Grid */}
        <CartesianGrid
          stroke="currentColor"
          strokeOpacity={0.08}
          vertical={false}
        />

        {/* X Axis */}
        <XAxis
          dataKey="label"
          tick={{
            fill: "currentColor",
            fontSize: 9,
          }}
          tickLine={false}
          axisLine={false}
          tickMargin={6}
        />

        {/* Y Axis */}
        <YAxis
          width={42}
          tick={{
            fill: "currentColor",
            fontSize: 9,
          }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`}
        />

        {/* Tooltip */}
        <Tooltip
          formatter={(value) => [
            `₹${Number(value).toLocaleString("en-IN")}`,
            "Sales",
          ]}
        />

        {/* Sales */}
        <Area
          type="monotone"
          dataKey="sales"
          stroke="var(--color-primary)"
          strokeWidth={2}
          fill="url(#salesGradient)"
        />
      </AreaChart>
    </div>
  );
};

export default SalesChartGraph;
