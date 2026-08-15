import React from "react";
import {
  Package,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductPagination from "./ProductPagination";

const RecentProducts = ({ products = [] }) => {
  const navigate = useNavigate();

  const getStatusStyle = (status) => {
    switch (status) {
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

  const getStockStyle = (stock) => {
    if (stock === 0) {
      return "text-red-500";
    }

    if (stock <= 20) {
      return "text-orange-500";
    }

    return "text-green-600";
  };

  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <h2 className="text-xs font-semibold">
            Recent Products
          </h2>

          <p className="mt-0.5 text-[10px] text-secondary">
            Recently added products
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/products")}
          className="
            flex items-center gap-1
            text-[10px] font-medium
            text-primary
            hover:underline
          "
        >
          View All
          <ArrowRight size={12} />
        </button>
      </div>

      {/* Table */}

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[850px]">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-4 py-3 text-[10px] font-medium text-secondary">
                Product
              </th>

              <th className="px-4 py-3 text-[10px] font-medium text-secondary">
                SKU
              </th>

              <th className="px-4 py-3 text-[10px] font-medium text-secondary">
                Category
              </th>

              <th className="px-4 py-3 text-[10px] font-medium text-secondary">
                Sell Price
              </th>

              <th className="px-4 py-3 text-[10px] font-medium text-secondary">
                Stock
              </th>

              <th className="px-4 py-3 text-[10px] font-medium text-secondary">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="
                  border-b border-border
                  last:border-b-0
                  transition-colors
                  hover:bg-muted/30
                "
              >
                {/* Product */}

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="
                        flex h-9 w-9 shrink-0
                        items-center justify-center
                        overflow-hidden
                        rounded-md
                        border border-border
                        bg-background
                      "
                    >
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <Package
                          size={15}
                          className="text-secondary"
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="max-w-[200px] truncate text-xs font-medium">
                        {product.name}
                      </p>

                      <p className="mt-0.5 max-w-[200px] truncate text-[9px] text-secondary">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </td>

                {/* SKU */}

                <td className="px-4 py-3 text-xs text-secondary">
                  {product.sku}
                </td>

                {/* Category */}

                <td className="px-4 py-3 text-xs text-secondary">
                  {product.category}
                </td>

                {/* Sell Price */}

                <td className="px-4 py-3 text-xs font-semibold">
                  ₹{Number(product.sellPrice).toFixed(2)}
                </td>

                {/* Stock */}

                <td
                  className={`px-4 py-3 text-xs font-medium ${getStockStyle(
                    product.stock
                  )}`}
                >
                  {product.stock}
                </td>

                {/* Status */}

                <td className="px-4 py-3">
                  <span
                    className={`
                      inline-flex rounded-md
                      px-2 py-1
                      text-[9px] font-medium
                      ${getStatusStyle(
                        product.status
                      )}
                    `}
                  >
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}

            {/* Empty */}

            {products.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-10 text-center text-xs text-secondary"
                >
                  No recent products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ProductPagination/>
    </section>
  );
};

export default RecentProducts;