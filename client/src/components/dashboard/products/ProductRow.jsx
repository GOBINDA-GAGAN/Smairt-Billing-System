import React from "react";
import { MoreVertical, Package, Pencil } from "lucide-react";

const ProductRow = ({ product, selected, onSelect, onEdit }) => {
  const getStockStyle = () => {
    if (product.stock === 0) {
      return "text-red-500";
    }

    if (product.stock <= 20) {
      return "text-orange-500";
    }

    return "text-green-600";
  };

  const getStatusStyle = () => {
    switch (product.status) {
      case "In Stock":
        return "bg-green-500/10 text-green-600";

      case "Low Stock":
        return "bg-orange-500/10 text-orange-500";

      case "Out of Stock":
        return "bg-red-500/10 text-red-500";

      default:
        return "bg-muted text-secondary";
    }
  };

  return (
    <tr className="border-b border-border transition-colors hover:bg-muted/30">
      {/* Checkbox */}
      <td className="w-10 px-2 py-2.5">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(product.id)}
          className="h-3.5 w-3.5 rounded border-border accent-primary"
        />
      </td>

      {/* Product */}
      <td className="px-2 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-background">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling.style.display = "flex";
                }}
              />
            ) : null}

            <span
              className={`items-center justify-center text-secondary ${
                product.image ? "hidden" : "flex"
              }`}
            >
              <Package size={17} strokeWidth={1.8} />
            </span>
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-foreground">
              {product.name}
            </p>

            <p className="truncate text-[10px] text-secondary">
              {product.description}
            </p>
          </div>
        </div>
      </td>

      {/* SKU */}
      <td className="px-2 py-2.5 text-xs text-foreground">
        {product.sku}
      </td>

      {/* Category */}
      <td className="px-2 py-2.5 text-xs text-foreground">
        {product.category}
      </td>

      {/* Purchase Price */}
      <td className="px-2 py-2.5 text-xs font-medium text-foreground">
        ₹{Number(product.price).toFixed(2)}
      </td>

      {/* Sell Price */}
      <td className="px-2 py-2.5 text-xs font-semibold text-foreground">
        ₹{Number(product.sellPrice).toFixed(2)}
      </td>

      {/* Discount */}
      <td className="px-2 py-2.5">
        <span className="inline-flex rounded-md bg-primary/10 px-2 py-1 text-[9px] font-medium text-primary">
          {product.discount}%
        </span>
      </td>

      {/* Stock */}
      <td
        className={`px-2 py-2.5 text-xs font-medium ${getStockStyle()}`}
      >
        {product.stock}
      </td>

      {/* Status */}
      <td className="px-2 py-2.5">
        <span
          className={`
            inline-flex rounded-md
            px-2 py-1
            text-[9px] font-medium
            ${getStatusStyle()}
          `}
        >
          {product.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-2 py-2.5">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="
              flex h-7 w-7 items-center justify-center
              rounded-md border border-border
              text-secondary
              transition-colors
              hover:bg-muted hover:text-foreground
            "
          >
            <Pencil size={13} />
          </button>

          <button
            type="button"
            className="
              flex h-7 w-7 items-center justify-center
              rounded-md border border-border
              text-secondary
              transition-colors
              hover:bg-muted hover:text-foreground
            "
          >
            <MoreVertical size={13} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;