import React from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowDownUp,
  ChevronDown,
} from "lucide-react";

const ProductToolbar = ({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  stockStatus,
  setStockStatus,
}) => {
  return (
    <div className="flex flex-col gap-2 border-b border-border p-3 md:flex-row md:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
        />

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            h-8  rounded-md w-[50%]
            border border-border
            bg-background
            pl-9 pr-3
            text-xs text-foreground
            outline-none
            placeholder:text-muted-foreground
            focus:border-primary
          "
        />
      </div>

      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="
          h-8 rounded-md border border-border
          bg-background px-2.5
          text-xs text-foreground
          outline-none
        "
      >
        <option value="all">All Categories</option>
        <option value="Medicine">Medicine</option>
        <option value="Personal Care">Personal Care</option>
        <option value="Groceries">Groceries</option>
        <option value="Home Care">Home Care</option>
      </select>

      {/* Brand */}
      <select
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="
          h-8 rounded-md border border-border
          bg-background px-2.5
          text-xs text-foreground
          outline-none
        "
      >
        <option value="all">All Brands</option>
        <option value="Himalaya">Himalaya</option>
        <option value="Dove">Dove</option>
        <option value="Parle">Parle</option>
        <option value="Surf">Surf</option>
      </select>

      {/* Stock Status */}
      <select
        value={stockStatus}
        onChange={(e) => setStockStatus(e.target.value)}
        className="
          h-8 rounded-md border border-border
          bg-background px-2.5
          text-xs text-foreground
          outline-none
        "
      >
        <option value="all">Stock Status</option>
        <option value="in-stock">In Stock</option>
        <option value="low-stock">Low Stock</option>
        <option value="out-of-stock">Out of Stock</option>
      </select>

      {/* Actions */}
      <div className="flex items-center gap-2 md:ml-auto">
        <button
          type="button"
          className="
            inline-flex h-8 items-center gap-1.5
            rounded-md border border-border
            bg-background px-3
            text-xs font-medium text-foreground
            transition-colors hover:bg-muted
          "
        >
          <SlidersHorizontal size={13} />
          Filter
        </button>

        <button
          type="button"
          className="
            inline-flex h-8 items-center gap-1.5
            rounded-md border border-border
            bg-background px-3
            text-xs font-medium text-foreground
            transition-colors hover:bg-muted
          "
        >
          <ArrowDownUp size={13} />
          Sort
        </button>
      </div>
    </div>
  );
};

export default ProductToolbar;