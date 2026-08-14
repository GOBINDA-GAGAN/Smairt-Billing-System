import React from "react";

const CustomerStatCard = ({
  title,
  value,
  description,
  icon: Icon,
}) => {
  return (
    <div className="w-full rounded-xl border border-secondary/20 bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-secondary">
          {title}
        </p>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-secondary/20 bg-primary/5 text-secondary">
          <Icon size={18} />
        </div>
      </div>

      <h2 className="mt-3 text-2xl font-semibold text-primary">
        {value}
      </h2>

      <p className="mt-2 text-xs text-secondary">
        {description}
      </p>
    </div>
  );
};



export default CustomerStatCard;