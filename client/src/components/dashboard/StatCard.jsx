import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  description,
  trendType = "increase",
}) => {
  const isIncrease = trendType === "increase";

  return (
    <div
      className="
        group relative overflow-hidden
        flex items-center gap-3
        rounded-md border border-border
        bg-card
        px-3 py-2.5
        shadow-sm
        transition-all duration-300
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      {/* Icon */}
      <div
        className="
          flex h-10 w-10 shrink-0
          items-center justify-center
          rounded-full
          bg-primary/10
          text-primary
          transition-all duration-300
          group-hover:scale-105
        "
      >
        <Icon size={19} strokeWidth={2} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium leading-3 text-muted-foreground">
          {title}
        </p>

        <h2 className="mt-0.5 text-lg font-semibold leading-5 tracking-tight text-foreground">
          {value}
        </h2>

        <div className="mt-0.5">
          <span className="text-[9px] text-muted-foreground">
            {description}
          </span>
        </div>
      </div>

      {/* Trend */}
      <span
        className={`
          inline-flex shrink-0 items-center gap-0.5
          rounded-md px-1.5 py-1
          text-[9px] font-semibold
          ${
            isIncrease
              ? "bg-success-soft text-success"
              : "bg-danger-soft text-danger"
          }
        `}
      >
        {isIncrease ? (
          <ArrowUpRight size={11} strokeWidth={2.5} />
        ) : (
          <ArrowDownRight size={11} strokeWidth={2.5} />
        )}

        {trend}
      </span>
    </div>
  );
};

export default StatCard;