import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Search,
  SlidersHorizontal,
  Plus,
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Tag,
} from "lucide-react";
import { createBrand, getBrands } from "../../../api/categoryBrand.api";

const ITEMS_PER_PAGE = 5;

const statusStyle = {
  Active: "bg-primary/10 text-primary",
  Inactive: "bg-secondary/10 text-secondary",
  Archived: "bg-muted text-muted-foreground",
};

const Brands = () => {
  const [brands, setBrands] = useState([]);

  console.log(brands);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      status: "Active",
    },
  });

  // Fetch all brands
  const fetchBrands = async () => {
    try {
      // console.log(data);
      const response = await getBrands();
      setBrands(response.data.brands);
    } catch (error) {
      console.error(error);
    }
  };

  // Create a new brand
  const handleAddBrand = async (data) => {
    try {
      // console.log(data);
      const response = await createBrand(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Update an existing brand
  const handleEditBrand = async (data) => {};

  // Delete the selected brand
  const handleDeleteBrand = async () => {};

  // Fetch brands when component loads
  useEffect(() => {
    fetchBrands();
  }, []);

  // Filter brands by search and status
  const filtered = useMemo(() => {
    return brands.filter((brand) => {
      const searchMatch = brand.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const statusMatch = status === "All Status" || brand.status === status;

      return searchMatch && statusMatch;
    });
  }, [brands, search, status]);

  // Calculate total pages
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  // Get current page items
  const currentItems = showAll
    ? filtered
    : filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Count active brands
  const active = brands.filter((brand) => brand.status === "Active").length;

  // Count inactive brands
  const inactive = brands.filter((brand) => brand.status === "Inactive").length;

  // Count archived brands
  const archived = brands.filter((brand) => brand.status === "Archived").length;

  // Count total brands
  const total = brands.length;

  // Calculate active percentage
  const activePercent = total ? (active / total) * 100 : 0;

  // Calculate inactive percentage
  const inactivePercent = total ? (inactive / total) * 100 : 0;

  // Handle brand search
  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
    setShowAll(false);
  };

  // Handle brand status filter
  const handleStatus = (value) => {
    setStatus(value);
    setPage(1);
    setShowAll(false);
  };

  // Show all brands
  const handleShowAll = () => {
    setSearch("");
    setStatus("All Status");
    setPage(1);
    setShowAll(true);
  };

  // Show pagination
  const handleShowPagination = () => {
    setShowAll(false);
    setPage(1);
  };

  // Open add brand modal
  const openAddModal = () => {
    reset({
      name: "",
      status: "Active",
    });

    setError("");
    setShowAddModal(true);
  };

  // Open edit brand modal
  const openEditModal = (brand) => {
    setSelectedBrand(brand);

    reset({
      name: brand.name,
      status: brand.status,
    });

    setError("");
    setShowEditModal(true);
  };

  // Open delete confirmation modal
  const openDeleteModal = (brand) => {
    setSelectedBrand(brand);
    setShowDeleteModal(true);
  };

  // Close all modals
  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedBrand(null);
    setError("");
    reset();
  };

  return (
    <div className="min-w-0 w-full bg-background">
      <div className="w-full space-y-4">
        {/* BRANDS */}

        <div className="overflow-hidden rounded-md border border-border bg-card shadow-sm">
          {/* HEADER */}

          <div className="flex items-center justify-between border-b border-border p-4">
            <div>
              <h1 className="text-lg font-semibold text-foreground">Brands</h1>

              <p className="mt-1 text-xs text-muted-foreground">
                Manage product brands
              </p>
            </div>

            <button
              onClick={openAddModal}
              className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 sm:h-auto sm:w-auto sm:gap-2 sm:px-4 sm:py-2.5"
            >
              <Plus size={16} />

              <span className="hidden sm:inline">Add Brand</span>
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
                placeholder="Search brands..."
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

          {/* TABLE */}

          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[620px]">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="w-10 px-3 py-2.5 text-center text-[11px] font-medium text-muted-foreground">
                    #
                  </th>

                  <th className="px-3 py-2.5 text-left text-[11px] font-medium text-muted-foreground">
                    Brand Name
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
                {currentItems.map((brand, index) => {
                  const Icon =  brand.icon;
                  console.log(Icon);
                  

                  const rowNumber = showAll
                    ? index + 1
                    : (page - 1) * ITEMS_PER_PAGE + index + 1;

                  return (
                    <tr
                      key={brand._id}
                      className="border-b border-border hover:bg-muted/30"
                    >
                      <td className="px-3 py-2.5 text-center text-[11px] text-muted-foreground">
                        {rowNumber}
                      </td>

                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                            <Tag size={14} />
                          </div>

                          <span className="whitespace-nowrap text-xs font-medium text-foreground">
                            {brand.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-3 py-2.5 text-center text-xs text-muted-foreground">
                        {brand.products}
                      </td>

                      <td className="px-3 py-2.5 text-center">
                        <span
                          className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium ${statusStyle[brand.status]}`}
                        >
                          {brand.status}
                        </span>
                      </td>

                      <td className="px-3 py-2.5">
                        <div className="flex justify-center gap-1.5">
                          <button
                            onClick={() => openEditModal(brand)}
                            className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                            title="Edit"
                          >
                            <Pencil size={13} />
                          </button>

                          <button
                            onClick={() => openDeleteModal(brand)}
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
              <Tag size={32} className="mx-auto text-muted-foreground" />

              <p className="mt-3 text-sm font-medium text-foreground">
                No brands found
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Try changing your search or filter.
              </p>

              <button
                onClick={handleShowAll}
                className="mt-4 rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"
              >
                Show All Brands
              </button>
            </div>
          )}

          {/* PAGINATION */}

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
                </span>{" "}
                brands
              </p>

              <div className="flex items-center gap-1">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted disabled:opacity-40"
                >
                  <ChevronLeft size={14} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
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
                  ),
                )}

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

          {/* SHOW ALL */}

          {showAll && filtered.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-border p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                Showing all{" "}
                <span className="font-medium text-foreground">
                  {filtered.length}
                </span>{" "}
                brands
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

        {/* OVERVIEW */}

        <div className="overflow-hidden rounded-md border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border p-4">
            <h2 className="text-sm font-semibold text-foreground">
              Brands Overview
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
                  <Tag size={32} className="text-primary" />
                </div>

                <p className="mx-auto mt-3 max-w-[180px] text-[11px] leading-5 text-muted-foreground">
                  Keep your product brands organized and easy to manage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}

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
                  {showAddModal ? "Add Brand" : "Edit Brand"}
                </h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  {showAddModal
                    ? "Create a new product brand."
                    : "Update brand information."}
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
              onSubmit={handleSubmit(
                showAddModal ? handleAddBrand : handleEditBrand,
              )}
              className="space-y-4 p-4"
            >
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">
                  Brand Name
                </label>

                <input
                  {...register("name", {
                    required: "Brand name is required",
                  })}
                  placeholder="Enter brand name"
                  autoFocus
                  className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">
                  Status
                </label>

                <select
                  {...register("status")}
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
                  {showAddModal ? "Create Brand" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}

      {showDeleteModal && selectedBrand && (
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
              Delete Brand?
            </h2>

            <p className="mt-2 text-sm leading-5 text-muted-foreground">
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                "{selectedBrand.name}"
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
                onClick={handleDeleteBrand}
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

export default Brands;
