import React, { useState } from "react";
import {
  Search,
  Barcode,
  Package,
  Plus,
} from "lucide-react";

const productsData = [
  {
    id: 1,
    name: "Paracetamol 650mg",
    description: "Pain relief medicine",
    sku: "MED-1001",
    price: 50,
    stock: 120,
  },
  {
    id: 2,
    name: "Azithromycin 500mg",
    description: "Antibiotic medicine",
    sku: "MED-1002",
    price: 110,
    stock: 15,
  },
  {
    id: 3,
    name: "Vitamin C Tablets",
    description: "Vitamin supplement",
    sku: "SUP-1003",
    price: 149,
    stock: 75,
  },
  {
    id: 4,
    name: "Dettol Antiseptic",
    description: "Antiseptic liquid",
    sku: "PER-1004",
    price: 120,
    stock: 42,
  },
  {
    id: 5,
    name: "Digital Thermometer",
    description: "Digital body thermometer",
    sku: "DEV-1005",
    price: 249,
    stock: 18,
  },
];

const ProductSelector = ({ onAddProduct }) => {
  const [search, setSearch] = useState("");
  const [barcode, setBarcode] = useState("");

  const filteredProducts = productsData.filter((product) => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return false;
    }

    return (
      product.name.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query)
    );
  });

  const handleAddProduct = (product) => {
    onAddProduct(product);
    setSearch("");
  };

  const handleBarcodeSearch = () => {
    const value = barcode.trim();

    if (!value) {
      return;
    }

    // For now barcode uses SKU as demo lookup.
    const product = productsData.find(
      (item) =>
        item.sku.toLowerCase() === value.toLowerCase()
    );

    if (product) {
      onAddProduct(product);
      setBarcode("");
    }
  };

  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card">
      {/* Header */}

      <div className="border-b border-border px-4 py-3">
        <h2 className="text-xs font-semibold text-foreground">
          Add Products
        </h2>

        <p className="mt-0.5 text-[10px] text-secondary">
          Search products or enter a barcode to add items.
        </p>
      </div>

      <div className="p-4">
        {/* Search */}

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search
              size={14}
              className="
                absolute left-3 top-1/2
                -translate-y-1/2
                text-secondary
              "
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search product by name or SKU..."
              className="
                h-9 w-full rounded-md
                border border-border
                bg-background
                pl-9 pr-3
                text-xs
                text-foreground
                outline-none
                placeholder:text-secondary
                focus:border-primary
              "
            />
          </div>

          {/* Barcode */}

          <div className="flex w-[220px] shrink-0 gap-2">
            <div className="relative flex-1">
              <Barcode
                size={14}
                className="
                  absolute left-3 top-1/2
                  -translate-y-1/2
                  text-secondary
                "
              />

              <input
                type="text"
                value={barcode}
                onChange={(event) =>
                  setBarcode(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleBarcodeSearch();
                  }
                }}
                placeholder="Barcode"
                className="
                  h-9 w-full rounded-md
                  border border-border
                  bg-background
                  pl-9 pr-3
                  text-xs
                  outline-none
                  placeholder:text-secondary
                  focus:border-primary
                "
              />
            </div>

            <button
              type="button"
              onClick={handleBarcodeSearch}
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-md
                border border-border
                text-secondary
                hover:bg-muted
                hover:text-primary
              "
              title="Add barcode product"
            >
              <Barcode size={16} />
            </button>
          </div>
        </div>

        {/* Search Results */}

        {search.trim() && (
          <div className="mt-2 overflow-hidden rounded-md border border-border bg-background">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() =>
                    handleAddProduct(product)
                  }
                  className="
                    flex w-full items-center
                    justify-between
                    border-b border-border
                    px-3 py-2.5
                    text-left
                    last:border-b-0
                    hover:bg-muted/50
                  "
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="
                        flex h-8 w-8
                        items-center justify-center
                        rounded-md
                        border border-border
                        bg-card
                        text-secondary
                      "
                    >
                      <Package size={14} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-foreground">
                        {product.name}
                      </p>

                      <p className="mt-0.5 text-[9px] text-secondary">
                        {product.sku} · Stock{" "}
                        {product.stock}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold">
                      ₹{product.price.toFixed(2)}
                    </span>

                    <Plus
                      size={14}
                      className="text-primary"
                    />
                  </div>
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-center">
                <p className="text-xs text-secondary">
                  No product found.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSelector;