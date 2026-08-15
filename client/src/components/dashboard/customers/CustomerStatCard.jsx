import React from "react";

const CustomerStatCard = ({
  title,
  value,
  description,
  icon: Icon,
}) => {
  return (
    <div
      className="
        group relative flex w-full items-center gap-3
        rounded-md border border-border
        bg-card px-3 py-2.5
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
        <p className="text-[10px] font-medium leading-3 text-secondary">
          {title}
        </p>

        <h2 className="mt-0.5 text-lg font-semibold leading-5 text-foreground">
          {value}
        </h2>

        <p className="mt-0.5 text-[9px] leading-3 text-secondary">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CustomerStatCard;