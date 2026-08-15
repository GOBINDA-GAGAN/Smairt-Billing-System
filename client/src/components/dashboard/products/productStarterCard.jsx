import React from "react";
import { Package } from "lucide-react";

const ProductStarterCard = ({
  name = "Total Products",
  totalproduct = 0,
  increase = 0,
  description = "All products",
}) => {
  return (
    <div className="flex w-full items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5">
      {/* Icon */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600">
        <Package size={19} strokeWidth={2} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium text-secondary">
          {name}
        </p>

        <h2 className="mt-0.5 text-lg font-semibold leading-5 text-foreground">
          {totalproduct}
        </h2>

        <p className="mt-0.5 text-[9px] text-secondary">
          {description}
        </p>
      </div>

      {/* Increase */}
      <span
        className={`shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-medium ${
          increase >= 0
            ? "bg-green-500/10 text-green-600"
            : "bg-red-500/10 text-red-500"
        }`}
      >
        {increase >= 0 ? "+" : ""}
        {increase}%
      </span>
    </div>
  );
};

export default ProductStarterCard;