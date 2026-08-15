import React from "react";
import ProductRow from "./ProductRow";

const ProductTable = ({
  products,
  selectedProducts,
  setSelectedProducts,
  onEdit,
}) => {
  const allSelected =
    products.length > 0 &&
    products.every((product) => selectedProducts.includes(product.id));

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((product) => product.id));
    }
  };

  const handleSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[900px]">
        <thead>
          <tr className="border-b border-border bg-muted/20">
            <th className="w-10 px-2 py-2.5 text-left">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
                className="h-3.5 w-3.5 rounded border-border accent-primary"
              />
            </th>

            <th className="px-2 py-2.5 text-left text-[10px] font-semibold text-secondary">
              Product
            </th>

            <th className="px-2 py-2.5 text-left text-[10px] font-semibold text-secondary">
              SKU
            </th>

            <th className="px-2 py-2.5 text-left text-[10px] font-semibold text-secondary">
              Category
            </th>

            <th className="px-2 py-2.5 text-left text-[10px] font-semibold text-secondary">
              Price
            </th>

            <th className="px-2 py-2.5 text-left text-[10px] font-semibold text-secondary">
              Sell Price
            </th>
            <th className="px-2 py-2.5 text-left text-[10px] font-semibold text-secondary">
              Discount
            </th>

            <th className="px-2 py-2.5 text-left text-[10px] font-semibold text-secondary">
              Stock
            </th>

            <th className="px-2 py-2.5 text-left text-[10px] font-semibold text-secondary">
              Status
            </th>

            <th className="px-2 py-2.5 text-left text-[10px] font-semibold text-secondary">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              selected={selectedProducts.includes(product.id)}
              onSelect={handleSelect}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
