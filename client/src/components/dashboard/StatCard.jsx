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
        rounded-md border border-border
        bg-card p-5
        shadow-sm
        transition-all duration-300
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      {/* Subtle background glow */}
      <div
        className="
          pointer-events-none absolute
          -right-10 -top-10
          h-24 w-24
          rounded-full
          bg-primary/5
          blur-2xl
          transition-all duration-300
          group-hover:bg-primary/10
        "
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
              {value}
            </h2>
          </div>

          {/* Icon */}
          <div
            className="
              flex h-11 w-11 items-center justify-center
              rounded-xl
              bg-primary/10
              text-primary
              transition-all duration-300
              group-hover:scale-105
              group-hover:bg-primary/15
            "
          >
            <Icon size={20} strokeWidth={2} />
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-5 flex items-center gap-2">
          <span
            className={`
              inline-flex items-center gap-1
              rounded-full px-2 py-1
              text-xs font-semibold
              ${
                isIncrease
                  ? "bg-success-soft text-success"
                  : "bg-danger-soft text-danger"
              }
            `}
          >
            {isIncrease ? (
              <ArrowUpRight size={13} strokeWidth={2.5} />
            ) : (
              <ArrowDownRight size={13} strokeWidth={2.5} />
            )}

            {trend}
          </span>

          <span className="text-xs text-muted-foreground">
            {description}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;