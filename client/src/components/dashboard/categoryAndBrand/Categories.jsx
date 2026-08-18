import React, { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Plus,
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Shirt,
  ShoppingBasket,
  Footprints,
  Watch,
  FolderOpen,
} from "lucide-react";

const dummyCategories = [
  {
    id: 1,
    name: "Electronics",
    products: 45,
    status: "Active",
    icon: Monitor,
  },
  {
    id: 2,
    name: "Clothing & Fashion",
    products: 38,
    status: "Active",
    icon: Shirt,
  },
  {
    id: 3,
    name: "Groceries",
    products: 62,
    status: "Active",
    icon: ShoppingBasket,
  },
  {
    id: 4,
    name: "Footwear",
    products: 26,
    status: "Active",
    icon: Footprints,
  },
  {
    id: 5,
    name: "Accessories",
    products: 18,
    status: "Active",
    icon: Watch,
  },
  {
    id: 6,
    name: "Home & Kitchen",
    products: 31,
    status: "Inactive",
    icon: FolderOpen,
  },
  {
    id: 7,
    name: "Beauty",
    products: 24,
    status: "Active",
    icon: FolderOpen,
  },
  {
    id: 8,
    name: "Sports",
    products: 19,
    status: "Active",
    icon: FolderOpen,
  },
  {
    id: 9,
    name: "Books",
    products: 12,
    status: "Archived",
    icon: FolderOpen,
  },
  {
    id: 10,
    name: "Toys",
    products: 17,
    status: "Active",
    icon: FolderOpen,
  },
  {
    id: 11,
    name: "Furniture",
    products: 14,
    status: "Active",
    icon: FolderOpen,
  },
  {
    id: 12,
    name: "Stationery",
    products: 21,
    status: "Active",
    icon: FolderOpen,
  },
];

const ITEMS_PER_PAGE = 5;

const statusStyle = {
  Active: "bg-primary/10 text-primary",
  Inactive: "bg-secondary/10 text-secondary",
  Archived: "bg-muted text-muted-foreground",
};

const Categories = () => {
  const [categories, setCategories] = useState(dummyCategories);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    status: "Active",
  });

  const [error, setError] = useState("");

  /* =====================================================
     FILTER
  ===================================================== */

  const filtered = useMemo(() => {
    return categories.filter((item) => {
      const searchMatch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const statusMatch = status === "All Status" || item.status === status;

      return searchMatch && statusMatch;
    });
  }, [categories, search, status]);

  /* =====================================================
     PAGINATION
  ===================================================== */

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const currentItems = showAll
    ? filtered
    : filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  /* =====================================================
     OVERVIEW
  ===================================================== */

  const active = categories.filter((item) => item.status === "Active").length;

  const inactive = categories.filter(
    (item) => item.status === "Inactive",
  ).length;

  const archived = categories.filter(
    (item) => item.status === "Archived",
  ).length;

  const total = categories.length;

  const activePercent = total ? (active / total) * 100 : 0;

  const inactivePercent = total ? (inactive / total) * 100 : 0;

  /* =====================================================
     SEARCH
  ===================================================== */

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
    setShowAll(false);
  };

  /* =====================================================
     STATUS
  ===================================================== */

  const handleStatus = (value) => {
    setStatus(value);
    setPage(1);
    setShowAll(false);
  };

  /* =====================================================
     SHOW ALL
  ===================================================== */

  const handleShowAll = () => {
    setSearch("");
    setStatus("All Status");
    setPage(1);
    setShowAll(true);
  };

  /* =====================================================
     SHOW PAGINATION
  ===================================================== */

  const handleShowPagination = () => {
    setShowAll(false);
    setPage(1);
  };

  /* =====================================================
     INPUT
  ===================================================== */

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  /* =====================================================
     OPEN ADD MODAL
  ===================================================== */

  const openAddModal = () => {
    setFormData({
      name: "",
      status: "Active",
    });

    setError("");
    setShowAddModal(true);
  };

  /* =====================================================
     ADD CATEGORY
  ===================================================== */

  const handleAddCategory = (e) => {
    e.preventDefault();

    const name = formData.name.trim();

    if (!name) {
      setError("Category name is required.");
      return;
    }

    const exists = categories.some(
      (item) => item.name.toLowerCase() === name.toLowerCase(),
    );

    if (exists) {
      setError("Category already exists.");
      return;
    }

    const newCategory = {
      id: Date.now(),
      name,
      products: 0,
      status: formData.status,
      icon: FolderOpen,
    };

    setCategories((prev) => [newCategory, ...prev]);

    setShowAddModal(false);

    setFormData({
      name: "",
      status: "Active",
    });

    setPage(1);
  };

  /* =====================================================
     OPEN EDIT MODAL
  ===================================================== */

  const openEditModal = (category) => {
    setSelectedCategory(category);

    setFormData({
      name: category.name,
      status: category.status,
    });

    setError("");
    setShowEditModal(true);
  };

  /* =====================================================
     EDIT CATEGORY
  ===================================================== */

  const handleEditCategory = (e) => {
    e.preventDefault();

    const name = formData.name.trim();

    if (!name) {
      setError("Category name is required.");
      return;
    }

    const exists = categories.some(
      (item) =>
        item.id !== selectedCategory.id &&
        item.name.toLowerCase() === name.toLowerCase(),
    );

    if (exists) {
      setError("Category already exists.");
      return;
    }

    setCategories((prev) =>
      prev.map((item) =>
        item.id === selectedCategory.id
          ? {
              ...item,
              name,
              status: formData.status,
            }
          : item,
      ),
    );

    setShowEditModal(false);
    setSelectedCategory(null);
    setError("");
  };

  /* =====================================================
     OPEN DELETE MODAL
  ===================================================== */

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  /* =====================================================
     DELETE CATEGORY
  ===================================================== */

  const handleDeleteCategory = () => {
    setCategories((prev) =>
      prev.filter((item) => item.id !== selectedCategory.id),
    );

    setShowDeleteModal(false);
    setSelectedCategory(null);

    if (!showAll && currentItems.length === 1 && page > 1) {
      setPage(page - 1);
    }
  };

  /* =====================================================
     CLOSE MODALS
  ===================================================== */

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedCategory(null);
    setError("");
  };

  return (
    <div className="min-w-0 w-full bg-background">
      <div className="w-full space-y-4">
        {/* =================================================
            CATEGORY TABLE
        ================================================= */}

        <div className="overflow-hidden rounded-md border border-border bg-card shadow-sm">
          {/* HEADER */}

          {/* HEADER */}

          <div className="flex items-center justify-between border-b border-border p-4">
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                Categories
              </h1>

              <p className="mt-1 text-xs text-muted-foreground">
                Manage product categories
              </p>
            </div>

            <button
              onClick={openAddModal}
              className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 sm:h-auto sm:w-auto sm:gap-2 sm:px-4 sm:py-2.5"
            >
              <Plus size={16} />

              <span className="hidden sm:inline">Add Category</span>
            </button>
          </div>

          {/* SEARCH + FILTER */}

          <div className="flex items-center gap-2 border-b border-border p-4">
            {/* SEARCH */}

            <div className="relative min-w-0 flex-1 sm:max-w-xs">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <input
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search categories..."
                className="h-10 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
              />
            </div>

            {/* FILTER */}

            <div className="relative">
              <SlidersHorizontal
                size={15}
                className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-muted-foreground sm:left-3 sm:translate-x-0"
              />

              <select
                value={status}
                onChange={(e) => handleStatus(e.target.value)}
                className="h-10 w-10 cursor-pointer appearance-none rounded-md border border-border bg-background text-transparent outline-none focus:border-primary sm:w-40 sm:pl-9 sm:pr-8 sm:text-sm sm:text-foreground"
              >
                <option value="All Status">All Status</option>

                <option value="Active">Active</option>

                <option value="Inactive">Inactive</option>

                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          {/* =================================================
              RESPONSIVE TABLE

              Mobile:
              horizontal scroll
              same table
              compact text

              Desktop:
              normal table
          ================================================= */}

          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[620px]">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="w-10 px-3 py-2.5 text-center text-[11px] font-medium text-muted-foreground">
                    #
                  </th>

                  <th className="px-3 py-2.5 text-left text-[11px] font-medium text-muted-foreground">
                    Category Name
                  </th>

                  <th className="px-3 py-2.5 text-center text-[11px] font-medium text-muted-foreground">
                    Products
                  </th>

                  <th className="px-3 py-2.5 text-center text-[11px] font-medium text-muted-foreground">
                    Status
                  </th>

                  <th className="px-3 py-2.5 text-center text-[11px] font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((item, index) => {
                  const Icon = item.icon;

                  const rowNumber = showAll
                    ? index + 1
                    : (page - 1) * ITEMS_PER_PAGE + index + 1;

                  return (
                    <tr
                      key={item.id}
                      className="border-b border-border transition-colors hover:bg-muted/30"
                    >
                      {/* NUMBER */}

                      <td className="px-3 py-2.5 text-center text-[11px] text-muted-foreground">
                        {rowNumber}
                      </td>

                      {/* CATEGORY */}

                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                            <Icon size={14} />
                          </div>

                          <span className="whitespace-nowrap text-xs font-medium text-foreground">
                            {item.name}
                          </span>
                        </div>
                      </td>

                      {/* PRODUCTS */}

                      <td className="px-3 py-2.5 text-center text-xs text-muted-foreground">
                        {item.products}
                      </td>

                      {/* STATUS */}

                      <td className="px-3 py-2.5 text-center">
                        <span
                          className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium ${statusStyle[item.status]}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* ACTIONS */}

                      <td className="px-3 py-2.5">
                        <div className="flex justify-center gap-1.5">
                          <button
                            onClick={() => openEditModal(item)}
                            className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                            title="Edit"
                          >
                            <Pencil size={13} />
                          </button>

                          <button
                            onClick={() => openDeleteModal(item)}
                            className="rounded-md bg-red-100 p-1.5 text-red-600 hover:bg-red-200"
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* EMPTY */}

          {currentItems.length === 0 && (
            <div className="py-14 text-center">
              <FolderOpen size={32} className="mx-auto text-muted-foreground" />

              <p className="mt-3 text-sm font-medium text-foreground">
                No categories found
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Try changing your search or filter.
              </p>

              <button
                onClick={handleShowAll}
                className="mt-4 rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"
              >
                Show All Categories
              </button>
            </div>
          )}

          {/* =================================================
              PAGINATION
          ================================================= */}

          {!showAll && filtered.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-border p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] text-muted-foreground sm:text-xs">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {(page - 1) * ITEMS_PER_PAGE + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium text-foreground">
                  {Math.min(page * ITEMS_PER_PAGE, filtered.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {filtered.length}
                </span>
              </p>

              <div className="flex items-center gap-1">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted disabled:opacity-40"
                >
                  <ChevronLeft size={14} />
                </button>

                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, i) => i + 1,
                ).map((number) => (
                  <button
                    key={number}
                    onClick={() => setPage(number)}
                    className={`h-8 min-w-8 rounded-md px-2 text-[11px] font-medium ${
                      page === number
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {number}
                  </button>
                ))}

                <button
                  disabled={page === totalPages || totalPages === 0}
                  onClick={() => setPage(page + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted disabled:opacity-40"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* =================================================
              SHOW ALL FOOTER
          ================================================= */}

          {showAll && filtered.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-border p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                Showing all{" "}
                <span className="font-medium text-foreground">
                  {filtered.length}
                </span>{" "}
                categories
              </p>

              <button
                onClick={handleShowPagination}
                className="rounded-md border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-muted"
              >
                Show Pagination
              </button>
            </div>
          )}
        </div>

        {/* =================================================
            OVERVIEW
        ================================================= */}

        <div className="overflow-hidden rounded-md border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border p-4">
            <h2 className="text-sm font-semibold text-foreground">
              Categories Overview
            </h2>

            <button
              onClick={showAll ? handleShowPagination : handleShowAll}
              className="text-xs font-medium text-primary hover:underline"
            >
              {showAll ? "Show Pagination" : "Show All"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* CHART */}

            <div className="flex items-center justify-center gap-5 border-b border-border p-5 md:border-b-0 md:border-r">
              <div
                className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(hsl(var(--primary)) 0 ${activePercent}%, hsl(var(--secondary)) ${activePercent}% ${activePercent + inactivePercent}%, hsl(var(--muted)) ${activePercent + inactivePercent}% 100%)`,
                }}
              >
                <div className="flex h-[70px] w-[70px] flex-col items-center justify-center rounded-full bg-card">
                  <span className="text-lg font-semibold text-foreground">
                    {total}
                  </span>

                  <span className="text-[9px] text-muted-foreground">
                    Total
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-[11px] text-muted-foreground">
                    Active
                  </span>
                  <span className="text-[11px] font-medium text-foreground">
                    {active}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-secondary" />
                  <span className="text-[11px] text-muted-foreground">
                    Inactive
                  </span>
                  <span className="text-[11px] font-medium text-foreground">
                    {inactive}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                  <span className="text-[11px] text-muted-foreground">
                    Archived
                  </span>
                  <span className="text-[11px] font-medium text-foreground">
                    {archived}
                  </span>
                </div>
              </div>
            </div>

            {/* INFO */}

            <div className="flex min-h-[160px] items-center justify-center p-5">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                  <FolderOpen size={32} className="text-primary" />
                </div>

                <p className="mx-auto mt-3 max-w-[180px] text-[11px] leading-5 text-muted-foreground">
                  All your categories are organized well!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================
          ADD / EDIT MODAL
      =================================================== */}

      {(showAddModal || showEditModal) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm"
          onMouseDown={closeModals}
        >
          <div
            className="w-full max-w-md rounded-md border border-border bg-card shadow-xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border p-4">
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  {showAddModal ? "Add Category" : "Edit Category"}
                </h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  {showAddModal
                    ? "Create a new product category."
                    : "Update category information."}
                </p>
              </div>

              <button
                onClick={closeModals}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={showAddModal ? handleAddCategory : handleEditCategory}
              className="space-y-4 p-4"
            >
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">
                  Category Name
                </label>

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInput}
                  placeholder="Enter category name"
                  autoFocus
                  className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInput}
                  className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
                >
                  <option value="Active">Active</option>

                  <option value="Inactive">Inactive</option>

                  <option value="Archived">Archived</option>
                </select>
              </div>

              {error && (
                <p className="rounded-md bg-red-100 px-3 py-2 text-xs text-red-600">
                  {error}
                </p>
              )}

              <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModals}
                  className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  {showAddModal ? "Create Category" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================
          DELETE MODAL
      =================================================== */}

      {showDeleteModal && selectedCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm"
          onMouseDown={closeModals}
        >
          <div
            className="w-full max-w-sm rounded-md border border-border bg-card p-5 shadow-xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-red-100 text-red-600">
              <Trash2 size={20} />
            </div>

            <h2 className="mt-4 text-base font-semibold text-foreground">
              Delete Category?
            </h2>

            <p className="mt-2 text-sm leading-5 text-muted-foreground">
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                "{selectedCategory.name}"
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                onClick={closeModals}
                className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteCategory}
                className="flex items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
