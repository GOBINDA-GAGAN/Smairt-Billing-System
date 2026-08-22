import React, { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { productStarter } from "../constants/productData";
import ProductStarterCard from "../components/dashboard/products/productStarterCard";
import ProductPagination from "../components/dashboard/products/ProductPagination";
import ProductTable from "../components/dashboard/products/ProductTable";
import ProductToolbar from "../components/dashboard/products/ProductToolbar";
import { useNavigate } from "react-router-dom";

const productsData = [
  {
    id: 1,
    name: "Paracetamol 650mg",
    description: "Pain relief medicine",
    sku: "MED-1001",
    category: "Medicine",
    brand:"",
    price: 40,
    sellPrice: 50,
    discount: 20,
    stock: 120,
    status: "In Stock",
    image: "/products/paracetamol.png",
  },
  {
    id: 2,
    name: "Ibuprofen 400mg",
    description: "Anti-inflammatory pain relief",
    sku: "MED-1002",
    category: "Medicine",
    price: 55,
    sellPrice: 70,
    discount: 21.43,
    stock: 85,
    status: "In Stock",
    image: "/products/ibuprofen.png",
  },
  {
    id: 3,
    name: "Vitamin C 500mg",
    description: "Daily vitamin supplement",
    sku: "MED-1003",
    category: "Medicine",
    price: 90,
    sellPrice: 120,
    discount: 25,
    stock: 15,
    status: "Low Stock",
    image: "/products/vitamin-c.png",
  },
  {
    id: 4,
    name: "Himalaya Face Wash",
    description: "Neem and turmeric face wash",
    sku: "PC-2001",
    category: "Personal Care",
    price: 110,
    sellPrice: 145,
    discount: 24.14,
    stock: 42,
    status: "In Stock",
    image: "/products/facewash.png",
  },
  {
    id: 5,
    name: "Dove Shampoo 180ml",
    description: "Daily hair care shampoo",
    sku: "PC-2002",
    category: "Personal Care",
    price: 150,
    sellPrice: 180,
    discount: 16.67,
    stock: 18,
    status: "Low Stock",
    image: "/products/shampoo.png",
  },
  {
    id: 6,
    name: "Lux Body Wash",
    description: "Refreshing floral body wash",
    sku: "PC-2003",
    category: "Personal Care",
    price: 130,
    sellPrice: 165,
    discount: 21.21,
    stock: 67,
    status: "In Stock",
    image: "/products/bodywash.png",
  },
  {
    id: 7,
    name: "Colgate MaxFresh",
    description: "Fresh breath toothpaste",
    sku: "PC-2004",
    category: "Personal Care",
    price: 75,
    sellPrice: 95,
    discount: 21.05,
    stock: 0,
    status: "Out of Stock",
    image: "/products/colgate.png",
  },
  {
    id: 8,
    name: "Marie Gold Biscuits",
    description: "Crispy tea-time biscuits",
    sku: "GRC-3001",
    category: "Groceries",
    price: 25,
    sellPrice: 30,
    discount: 16.67,
    stock: 250,
    status: "In Stock",
    image: "/products/biscuits.png",
  },
  {
    id: 9,
    name: "Tata Salt 1kg",
    description: "Iodized table salt",
    sku: "GRC-3002",
    category: "Groceries",
    price: 24,
    sellPrice: 28,
    discount: 14.29,
    stock: 12,
    status: "Low Stock",
    image: "/products/salt.png",
  },
  {
    id: 10,
    name: "Fortune Sunflower Oil",
    description: "Refined sunflower cooking oil",
    sku: "GRC-3003",
    category: "Groceries",
    price: 135,
    sellPrice: 155,
    discount: 12.9,
    stock: 95,
    status: "In Stock",
    image: "/products/oil.png",
  },
  {
    id: 11,
    name: "Aashirvaad Atta 5kg",
    description: "Whole wheat flour",
    sku: "GRC-3004",
    category: "Groceries",
    price: 245,
    sellPrice: 290,
    discount: 15.52,
    stock: 28,
    status: "In Stock",
    image: "/products/atta.png",
  },
  {
    id: 12,
    name: "Surf Excel Matic",
    description: "Detergent powder for washing machines",
    sku: "HC-4001",
    category: "Home Care",
    price: 210,
    sellPrice: 250,
    discount: 16,
    stock: 8,
    status: "Low Stock",
    image: "/products/surf.png",
  },
  {
    id: 13,
    name: "Vim Dishwash Liquid",
    description: "Lemon dishwashing liquid",
    sku: "HC-4002",
    category: "Home Care",
    price: 85,
    sellPrice: 105,
    discount: 19.05,
    stock: 55,
    status: "In Stock",
    image: "/products/vim.png",
  },
  {
    id: 14,
    name: "Harpic Toilet Cleaner",
    description: "Powerful toilet cleaning liquid",
    sku: "HC-4003",
    category: "Home Care",
    price: 95,
    sellPrice: 120,
    discount: 20.83,
    stock: 0,
    status: "Out of Stock",
    image: "/products/harpic.png",
  },
  {
    id: 15,
    name: "Dettol Hand Wash",
    description: "Antibacterial hand wash",
    sku: "PC-2005",
    category: "Personal Care",
    price: 75,
    sellPrice: 99,
    discount: 24.24,
    stock: 36,
    status: "In Stock",
    image: "/products/dettol.png",
  },
];

const Product = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [stockStatus, setStockStatus] = useState("all");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const navigate = useNavigate();

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "all" || product.category === category;

      const matchesStock =
        stockStatus === "all" ||
        (stockStatus === "in-stock" && product.status === "In Stock") ||
        (stockStatus === "low-stock" && product.status === "Low Stock") ||
        (stockStatus === "out-of-stock" && product.status === "Out of Stock");

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [search, category, stockStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleEdit = (product) => {
    console.log("Edit product:", product);
  };

  const handleAddProduct = () => {
    console.log("New product:");
    navigate("/products/add");

    // Later:
    // await createProduct(product);

    setIsAddProductOpen(false);
  };

  return (
    <div className="bg-background text-foreground space-y-3">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm text-secondary">
            Manage your products and inventory
          </p>
        </div>

        <button
          onClick={handleAddProduct}
          type="button"
          className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          <Plus size={18} />
          Add Product
        </button>
      </section>

      <section className="grid grid-cols-4 gap-4">
        {productStarter.map((card) => {
          return <ProductStarterCard key={card.id} {...card} />;
        })}
      </section>

      <section className="overflow-hidden rounded-lg border border-border bg-card">
        <ProductToolbar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          brand={brand}
          setBrand={setBrand}
          stockStatus={stockStatus}
          setStockStatus={setStockStatus}
        />

        <ProductTable
          products={paginatedProducts}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          onEdit={handleEdit}
        />

        <ProductPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          totalProducts={filteredProducts.length}
          pageSize={pageSize}
        />
      </section>
    </div>
  );
};

export default Product;
