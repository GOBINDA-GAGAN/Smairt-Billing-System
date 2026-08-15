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
        group
        relative
        min-w-0
        rounded-md
        border border-border
        bg-card
        px-2.5
        py-2.5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-md

        sm:px-3
        sm:py-3
      "
    >
      {/* Trend */}
      <span
        className={`
          absolute
          right-2
          top-2
          inline-flex
          items-center
          gap-0.5
          rounded-md
          px-1
          py-0.5
          text-[7px]
          font-semibold
          whitespace-nowrap

          sm:right-2.5
          sm:top-2.5
          sm:px-1.5
          sm:py-1
          sm:text-[9px]

          ${
            isIncrease
              ? "bg-success-soft text-success"
              : "bg-danger-soft text-danger"
          }
        `}
      >
        {isIncrease ? (
          <ArrowUpRight size={9} strokeWidth={2.5} />
        ) : (
          <ArrowDownRight size={9} strokeWidth={2.5} />
        )}

        {trend}
      </span>

      {/* Main Content */}
      <div className="flex min-w-0 items-center gap-2">
        {/* Icon */}
        <div
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-primary/10
            text-primary
            transition-transform
            duration-300
            group-hover:scale-105

            sm:h-9
            sm:w-9

            lg:h-10
            lg:w-10
          "
        >
          <Icon
            size={15}
            strokeWidth={2}
            className="sm:h-[17px] sm:w-[17px]"
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Title */}
          <p
            className="
              whitespace-nowrap
              text-[8px]
              font-medium
              leading-3
              text-muted-foreground

              sm:text-[10px]
            "
          >
            {title}
          </p>

          {/* Value */}
          <h2
            className="
              mt-0.5
              whitespace-nowrap
              text-sm
              font-bold
              leading-4
              tracking-tight
              text-foreground

              sm:text-lg
              sm:leading-5
            "
          >
            {value}
          </h2>

          {/* Description */}
          <p
            className="
              mt-0.5
              hidden
              truncate
              text-[9px]
              text-muted-foreground

              sm:block
            "
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;