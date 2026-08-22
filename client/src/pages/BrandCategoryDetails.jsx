import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Edit,
  Trash2,
  Tag,
  Folder,
  Package,
  CircleCheck,
  CircleX,
  AlertTriangle,
  X,
  Search,
  ChevronDown,
  SlidersHorizontal,
  ArrowUpDown,
  IndianRupee,
  Percent,
} from "lucide-react";

import {
  getBrandById,
  getCategoryById,
  deleteBrandById,
  deleteCategoryById,
} from "../api/categoryBrand.api";

const BrandCategoryDetails = ({ type }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Check whether this page is for Brand or Category
  const isBrand = type === "brand";

  // Main Brand/Category data
  const [data, setData] = useState(null);

  // Loading state while API is running
  const [loading, setLoading] = useState(true);

  // Delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Product search
  const [search, setSearch] = useState("");

  // Product status filter
  const [statusFilter, setStatusFilter] = useState("All Status");

  // ==========================================
  // GET BRAND / CATEGORY DETAILS
  // ==========================================

  // Get single brand/category details
 // Get single brand/category details
const fetchDetails = async () => {
  try {
    setLoading(true);

    const response = isBrand
      ? await getBrandById(id)
      : await getCategoryById(id);

    console.log("API Response:", response.data);

    // Both Brand and Category APIs now return:
    // response.data.data

    setData(response.data.data);
  } catch (error) {
    console.error(
      `Failed to fetch ${isBrand ? "brand" : "category"}:`,
      error
    );

    setData(null);
  } finally {
    setLoading(false);
  }
};

  // Fetch data when ID or type changes
  useEffect(() => {
    fetchDetails();
  }, [id, type]);

  // ==========================================
  // DUMMY PRODUCTS
  // ==========================================

  // For now these are dummy products.
  // Later replace this with your product API.
  const products = [
    {
      id: 1,
      name: "Paracetamol 650mg",
      description: "Pain relief medicine",
      sku: "MED-1001",
      category: "Medicine",
      brand: "Dolo",
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
      brand: "Dolo",
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
      brand: "Dolo",
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
      brand: "Dolo",
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
      brand: "Dolo",
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
      brand: "Dolo",
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
      brand: "Dolo",
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
      brand: "Dolo",
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
      brand: "Dolo",
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
      brand: "Dolo",
      price: 135,
      sellPrice: 155,
      discount: 12.9,
      stock: 95,
      status: "In Stock",
      image: "/products/oil.png",
    },
  ];

  // ==========================================
  // PRODUCT STATISTICS
  // ==========================================

  // Total number of products
  const totalProducts = products.length;

  // Total inventory value
  const totalValue = products.reduce(
    (total, product) => total + product.sellPrice * product.stock,
    0,
  );

  // Average discount of all products
  const averageDiscount =
    products.length > 0
      ? products.reduce((total, product) => total + product.discount, 0) /
        products.length
      : 0;

  // Low stock product count
  const lowStock = products.filter(
    (product) => product.status === "Low Stock",
  ).length;

  // Out of stock product count
  const outOfStock = products.filter(
    (product) => product.status === "Out of Stock",
  ).length;

  // ==========================================
  // SEARCH + STATUS FILTER
  // ==========================================

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const value = search.toLowerCase().trim();

      // Search product name, description, SKU and category
      const matchesSearch =
        product.name.toLowerCase().includes(value) ||
        product.description.toLowerCase().includes(value) ||
        product.sku.toLowerCase().includes(value) ||
        product.category.toLowerCase().includes(value);

      // Check selected status
      const matchesStatus =
        statusFilter === "All Status" || product.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  // ==========================================
  // DELETE BRAND / CATEGORY
  // ==========================================

  const handleDelete = async () => {
    try {
      // Delete Brand
      if (isBrand) {
        await deleteBrandById(id);
      }

      // Delete Category
      else {
        await deleteCategoryById(id);
      }

      // Close confirmation modal
      setShowDeleteModal(false);

      // Go back to Brand/Category list
      navigate("/categorys&brands");
    } catch (error) {
      console.error(
        `Failed to delete ${isBrand ? "brand" : "category"}:`,
        error,
      );
    }
  };

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-md border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // ==========================================
  // NOT FOUND
  // ==========================================

  if (!data) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center px-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-secondary">
          {isBrand ? (
            <Tag className="h-6 w-6 text-primary" />
          ) : (
            <Folder className="h-6 w-6 text-primary" />
          )}
        </div>

        <h2 className="mt-4 text-lg font-semibold text-foreground">
          {isBrand ? "Brand" : "Category"} Not Found
        </h2>

        <button
          onClick={() => navigate("/categorys&brands")}
          className="btn-primary mt-4"
        >
          <ArrowLeft size={16} />
          Back to {isBrand ? "Brands" : "Categories"}
        </button>
      </div>
    );
  }

  // ==========================================
  // MAIN PAGE
  // ==========================================

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 lg:p-5">
      {/* ======================================
          HEADER
      ======================================= */}

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Brand / Category title */}

        <div className="flex min-w-0 items-center gap-2.5">
          <button
            onClick={() => navigate("/categorys&brands")}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
            title="Back"
          >
            <ArrowLeft size={15} />
          </button>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-secondary">
            {isBrand ? (
              <Tag className="h-4 w-4 text-primary" />
            ) : (
              <Folder className="h-4 w-4 text-primary" />
            )}
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold text-foreground sm:text-lg">
              {data.name}
            </h1>

            <p className="truncate text-[10px] text-muted-foreground sm:text-xs">
              Manage {isBrand ? "brand" : "category"} details and products
            </p>
          </div>
        </div>

        {/* Edit / Delete buttons */}

        <div className="flex shrink-0 items-center gap-1.5">
          {/* Edit */}

          <button
            onClick={() =>
              navigate(
                isBrand ? `/brands/${id}/edit` : `/categories/${id}/edit`,
              )
            }
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-foreground transition hover:border-primary hover:text-primary sm:h-9 sm:w-auto sm:px-3"
            title={`Edit ${isBrand ? "Brand" : "Category"}`}
          >
            <Edit size={15} />

            <span className="ml-1.5 hidden text-xs font-medium sm:inline">
              Edit {isBrand ? "Brand" : "Category"}
            </span>
          </button>

          {/* Delete */}

          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-danger/20 bg-danger-soft text-danger transition hover:border-danger sm:h-9 sm:w-auto sm:px-3"
            title={`Delete ${isBrand ? "Brand" : "Category"}`}
          >
            <Trash2 size={15} />

            <span className="ml-1.5 hidden text-xs font-medium sm:inline">
              Delete
            </span>
          </button>
        </div>
      </div>

      {/* ======================================
          STAT CARDS
      ======================================= */}

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {/* Status */}

        <div className="rounded-md border border-border bg-card p-3 sm:p-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-success/10 bg-success-soft">
              {data.status === "Active" ? (
                <CircleCheck className="h-4 w-4 text-success" />
              ) : (
                <CircleX className="h-4 w-4 text-muted-foreground" />
              )}
            </div>

            <div className="min-w-0">
              <p className="truncate text-[9px] text-muted-foreground sm:text-[10px]">
                {isBrand ? "Brand" : "Category"} Status
              </p>

              <p className="truncate text-sm font-semibold text-card-foreground sm:text-base">
                {data.status}
              </p>
            </div>
          </div>

          <p className="mt-2 truncate text-[9px] text-muted-foreground">
            Current {isBrand ? "brand" : "category"} status
          </p>
        </div>

        {/* Products */}

        <div className="rounded-md border border-border bg-card p-3 sm:p-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/10 bg-secondary">
              <Package className="h-4 w-4 text-primary" />
            </div>

            <div>
              <p className="text-[9px] text-muted-foreground sm:text-[10px]">
                Total Products
              </p>

              <p className="text-sm font-semibold text-card-foreground sm:text-base">
                {totalProducts}
              </p>
            </div>
          </div>

          <p className="mt-2 text-[9px] text-muted-foreground">
            Products under this {isBrand ? "brand" : "category"}
          </p>
        </div>

        {/* Inventory */}

        <div className="rounded-md border border-border bg-card p-3 sm:p-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/10 bg-secondary">
              <IndianRupee className="h-4 w-4 text-primary" />
            </div>

            <div className="min-w-0">
              <p className="text-[9px] text-muted-foreground sm:text-[10px]">
                Inventory Value
              </p>

              <p className="truncate text-sm font-semibold text-card-foreground sm:text-base">
                ₹{totalValue.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <p className="mt-2 text-[9px] text-muted-foreground">
            Current inventory value
          </p>
        </div>

        {/* Discount */}

        <div className="rounded-md border border-border bg-card p-3 sm:p-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/10 bg-secondary">
              <Percent className="h-4 w-4 text-primary" />
            </div>

            <div>
              <p className="text-[9px] text-muted-foreground sm:text-[10px]">
                Avg. Discount
              </p>

              <p className="text-sm font-semibold text-card-foreground sm:text-base">
                {averageDiscount.toFixed(2)}%
              </p>
            </div>
          </div>

          <p className="mt-2 text-[9px] text-muted-foreground">
            Average product discount
          </p>
        </div>
      </div>

      {/* ======================================
          BRAND / CATEGORY INFORMATION
      ======================================= */}

      <div className="mt-2.5 overflow-hidden rounded-md border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-3 py-2.5 sm:px-4">
          <div>
            <h2 className="text-xs font-semibold text-card-foreground sm:text-sm">
              {isBrand ? "Brand Information" : "Category Information"}
            </h2>

            <p className="text-[9px] text-muted-foreground sm:text-[10px]">
              Basic {isBrand ? "brand" : "category"} information
            </p>
          </div>

          <span className="badge-success shrink-0 px-2 py-0.5 text-[9px]">
            {data.status}
          </span>
        </div>

        {/* Two columns on mobile */}

        <div className="grid grid-cols-2">
          <div className="border-b border-r border-border p-3">
            <p className="text-[9px] uppercase tracking-wide text-muted-foreground">
              {isBrand ? "Brand Name" : "Category Name"}
            </p>

            <p className="mt-1 truncate text-xs font-medium text-card-foreground sm:text-sm">
              {data.name}
            </p>
          </div>

          <div className="border-b border-border p-3">
            <p className="text-[9px] uppercase tracking-wide text-muted-foreground">
              Status
            </p>

            <div className="mt-1 flex items-center gap-1 text-xs font-medium text-card-foreground sm:text-sm">
              {data.status === "Active" ? (
                <CircleCheck className="h-3.5 w-3.5 text-success" />
              ) : (
                <CircleX className="h-3.5 w-3.5 text-muted-foreground" />
              )}

              {data.status}
            </div>
          </div>

          <div className="border-b border-r border-border p-3">
            <p className="text-[9px] uppercase tracking-wide text-muted-foreground">
              Products
            </p>

            <p className="mt-1 text-xs font-medium text-card-foreground sm:text-sm">
              {totalProducts}
            </p>
          </div>

          <div className="border-b border-border p-3">
            <p className="text-[9px] uppercase tracking-wide text-muted-foreground">
              Description
            </p>

            <p className="mt-1 truncate text-xs font-medium text-card-foreground sm:text-sm">
              {data.description || "No description"}
            </p>
          </div>
        </div>
      </div>

      {/* ======================================
          PRODUCTS TABLE
      ======================================= */}

      <div className="mt-2.5 overflow-hidden rounded-md border border-border bg-card">
        {/* Table Header */}

        <div className="flex flex-col gap-3 border-b border-border p-3 sm:p-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xs font-semibold text-card-foreground sm:text-sm">
              Products
            </h2>

            <p className="text-[9px] text-muted-foreground sm:text-[10px]">
              All products associated with {data.name}
            </p>
          </div>

          {/* Search + Filter */}

          <div className="flex flex-col gap-2 sm:flex-row">
            {/* Search */}

            <div className="relative w-full sm:w-60">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input h-9 py-2 pl-8 text-xs"
              />
            </div>

            {/* Status */}

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="select h-9 w-full appearance-none py-2 pr-8 text-xs sm:w-32"
              >
                <option>All Status</option>
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </div>

            {/* Filter */}

            <button className="btn-outline h-9 px-3 py-1.5 text-xs">
              <SlidersHorizontal size={14} />
              Filter
            </button>

            {/* Sort */}

            <button className="btn-outline h-9 px-3 py-1.5 text-xs">
              <ArrowUpDown size={14} />
              Sort
            </button>
          </div>
        </div>

        {/* Responsive table */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-border bg-card-secondary">
                <th className="w-10 px-3 py-3 text-left">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 accent-primary"
                  />
                </th>

                <th className="px-3 py-3 text-left text-[10px] font-semibold">
                  Product
                </th>

                <th className="px-3 py-3 text-left text-[10px] font-semibold">
                  SKU
                </th>

                <th className="px-3 py-3 text-left text-[10px] font-semibold">
                  Category
                </th>

                <th className="px-3 py-3 text-left text-[10px] font-semibold">
                  Price
                </th>

                <th className="px-3 py-3 text-left text-[10px] font-semibold">
                  Sell Price
                </th>

                <th className="px-3 py-3 text-left text-[10px] font-semibold">
                  Discount
                </th>

                <th className="px-3 py-3 text-left text-[10px] font-semibold">
                  Stock
                </th>

                <th className="px-3 py-3 text-left text-[10px] font-semibold">
                  Status
                </th>

                <th className="px-3 py-3 text-left text-[10px] font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-border hover:bg-surface-hover"
                  >
                    {/* Checkbox */}

                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        className="h-3.5 w-3.5 accent-primary"
                      />
                    </td>

                    {/* Product */}

                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-card-secondary">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <Package size={16} className="text-primary" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold">
                            {product.name}
                          </p>

                          <p className="max-w-[180px] truncate text-[10px] text-muted-foreground">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* SKU */}

                    <td className="px-3 py-3 text-xs">{product.sku}</td>

                    {/* Category */}

                    <td className="px-3 py-3 text-xs">{product.category}</td>

                    {/* Price */}

                    <td className="px-3 py-3 text-xs font-medium">
                      ₹{product.price.toFixed(2)}
                    </td>

                    {/* Sell Price */}

                    <td className="px-3 py-3 text-xs font-semibold">
                      ₹{product.sellPrice.toFixed(2)}
                    </td>

                    {/* Discount */}

                    <td className="px-3 py-3">
                      <span className="badge-success">{product.discount}%</span>
                    </td>

                    {/* Stock */}

                    <td className="px-3 py-3">
                      <span
                        className={
                          product.stock === 0
                            ? "font-medium text-danger"
                            : product.stock <= 20
                              ? "font-medium text-warning"
                              : "font-medium text-success"
                        }
                      >
                        {product.stock}
                      </span>
                    </td>

                    {/* Status */}

                    <td className="px-3 py-3">
                      {product.status === "In Stock" && (
                        <span className="badge-success">{product.status}</span>
                      )}

                      {product.status === "Low Stock" && (
                        <span className="badge-warning">{product.status}</span>
                      )}

                      {product.status === "Out of Stock" && (
                        <span className="badge-danger">{product.status}</span>
                      )}
                    </td>

                    {/* Product actions */}

                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() =>
                            navigate(`/products/${product.id}/edit`)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card hover:border-primary hover:text-primary"
                          title="Edit Product"
                        >
                          <Edit size={14} />
                        </button>

                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-danger hover:border-danger hover:bg-danger-soft"
                          title="Delete Product"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="10"
                    className="px-4 py-12 text-center text-xs text-muted-foreground"
                  >
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile table hint */}

        <div className="border-t border-border px-4 py-2 text-center text-[10px] text-muted-foreground sm:hidden">
          Swipe horizontally to view the complete table
        </div>
      </div>

      {/* ======================================
          DELETE CONFIRMATION MODAL
      ======================================= */}

      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm"
          onMouseDown={() => setShowDeleteModal(false)}
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-md border border-border bg-card shadow-xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Modal header */}

            <div className="flex items-start justify-between border-b border-border p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-danger/20 bg-danger-soft">
                  <AlertTriangle size={20} className="text-danger" />
                </div>

                <div>
                  <h2 className="text-sm font-semibold">
                    Delete {isBrand ? "Brand" : "Category"}?
                  </h2>

                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowDeleteModal(false)}
                className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X size={17} />
              </button>
            </div>

            {/* Modal body */}

            <div className="p-4">
              <p className="text-sm leading-6 text-muted-foreground">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-card-foreground">
                  {data.name}
                </span>
                ?
              </p>

              {/* Warning */}

              <div className="mt-4 rounded-md border border-danger/20 bg-danger-soft p-3">
                <div className="flex gap-2.5">
                  <AlertTriangle
                    size={17}
                    className="mt-0.5 shrink-0 text-danger"
                  />

                  <div>
                    <p className="text-xs font-semibold text-danger">
                      Related products warning
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-danger">
                      This {isBrand ? "brand" : "category"} currently has{" "}
                      <span className="font-bold">{totalProducts}</span> related
                      products.
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal buttons */}

              <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>

                <button onClick={handleDelete} className="btn-danger">
                  <Trash2 size={14} />
                  Delete {isBrand ? "Brand" : "Category"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandCategoryDetails;
