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
  Eye,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  createBrand,
  deleteBrandById,
  getBrands,
  updateBrandById,
} from "../../../api/categoryBrand.api";

const ITEMS_PER_PAGE = 5;

const statusStyle = {
  Active: "bg-primary/10 text-primary",
  Inactive: "bg-secondary/10 text-secondary",
  Archived: "bg-muted text-muted-foreground",
};

const Brands = () => {
  const navigate = useNavigate();

  // =====================================================
  // STATE
  // =====================================================

  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");

  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState(null);

  const [error, setError] = useState("");

  // =====================================================
  // REACT HOOK FORM
  // =====================================================

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      status: "Active",
      description: "",
    },
  });

  // =====================================================
  // FETCH BRANDS
  // =====================================================

  const fetchBrands = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getBrands();

      console.log("Brands response:", response.data);

      if (!response.data?.success) {
        setBrands([]);

        setError(
          response.data?.message || "Failed to fetch brands"
        );

        return;
      }

      setBrands(response.data.brands || []);
    } catch (error) {
      console.error("Failed to fetch brands:", error);

      setBrands([]);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch brands"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL FETCH
  // =====================================================

  useEffect(() => {
    fetchBrands();
  }, []);

  // =====================================================
  // FILTER
  // =====================================================

  const filtered = useMemo(() => {
    return brands.filter((brand) => {
      const brandName =
        brand.name?.toLowerCase() || "";

      const searchMatch = brandName.includes(
        search.toLowerCase()
      );

      const statusMatch =
        status === "All Status" ||
        brand.status === status;

      return searchMatch && statusMatch;
    });
  }, [brands, search, status]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.ceil(
    filtered.length / ITEMS_PER_PAGE
  );

  const currentItems = showAll
    ? filtered
    : filtered.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
      );

  // =====================================================
  // STATISTICS
  // =====================================================

  const active = brands.filter(
    (brand) => brand.status === "Active"
  ).length;

  const inactive = brands.filter(
    (brand) => brand.status === "Inactive"
  ).length;

  const archived = brands.filter(
    (brand) => brand.status === "Archived"
  ).length;

  const total = brands.length;

  const activePercent = total
    ? (active / total) * 100
    : 0;

  const inactivePercent = total
    ? (inactive / total) * 100
    : 0;

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
    setShowAll(false);
  };

  // =====================================================
  // STATUS FILTER
  // =====================================================

  const handleStatus = (value) => {
    setStatus(value);
    setPage(1);
    setShowAll(false);
  };

  // =====================================================
  // SHOW ALL
  // =====================================================

  const handleShowAll = () => {
    setSearch("");
    setStatus("All Status");
    setPage(1);
    setShowAll(true);
  };

  // =====================================================
  // SHOW PAGINATION
  // =====================================================

  const handleShowPagination = () => {
    setShowAll(false);
    setPage(1);
  };

  // =====================================================
  // OPEN ADD MODAL
  // =====================================================

  const openAddModal = () => {
    reset({
      name: "",
      status: "Active",
      description: "",
    });

    setSelectedBrand(null);
    setError("");
    setShowAddModal(true);
  };

  // =====================================================
  // CREATE BRAND
  // =====================================================

  const handleAddBrand = async (data) => {
    try {
      setError("");

      const payload = {
        name: data.name.trim(),
        status: data.status,
        description:
          data.description?.trim() || "",
      };

      const response = await createBrand(payload);

      console.log(
        "Create Brand Response:",
        response.data
      );

      // API failed
      if (!response.data?.success) {
        setError(
          response.data?.message ||
            "Failed to create brand"
        );

        return;
      }

      // Refresh list
      await fetchBrands();

      // Reset pagination
      setPage(1);

      // Close only after success
      closeModals();
    } catch (error) {
      console.error(
        "Create Brand Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to create brand"
      );
    }
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const openEditModal = (brand) => {
    setSelectedBrand(brand);

    reset({
      name: brand.name || "",
      status: brand.status || "Active",
      description: brand.description || "",
    });

    setError("");
    setShowEditModal(true);
  };

  // =====================================================
  // UPDATE BRAND
  // =====================================================

  const handleEditBrand = async (data) => {
    try {
      setError("");

      if (!selectedBrand?._id) {
        setError("Brand ID is missing");
        return;
      }

      const payload = {
        name: data.name.trim(),
        status: data.status,
        description:
          data.description?.trim() || "",
      };

      const response = await updateBrandById(
        selectedBrand._id,
        payload
      );

      console.log(
        "Update Brand Response:",
        response.data
      );

      if (!response.data?.success) {
        setError(
          response.data?.message ||
            "Failed to update brand"
        );

        return;
      }

      await fetchBrands();

      closeModals();
    } catch (error) {
      console.error(
        "Update Brand Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to update brand"
      );
    }
  };

  // =====================================================
  // OPEN DELETE MODAL
  // =====================================================

  const openDeleteModal = (brand) => {
    setSelectedBrand(brand);
    setError("");
    setShowDeleteModal(true);
  };

  // =====================================================
  // DELETE BRAND
  // =====================================================

  const handleDeleteBrand = async () => {
    try {
      setError("");

      if (!selectedBrand?._id) {
        setError("Brand ID is missing");
        return;
      }

      const response = await deleteBrandById(
        selectedBrand._id
      );

      console.log(
        "Delete Brand Response:",
        response.data
      );

      if (!response.data?.success) {
        setError(
          response.data?.message ||
            "Failed to delete brand"
        );

        return;
      }

      setShowDeleteModal(false);
      setSelectedBrand(null);

      await fetchBrands();

      if (
        !showAll &&
        currentItems.length === 1 &&
        page > 1
      ) {
        setPage((prev) => prev - 1);
      }
    } catch (error) {
      console.error(
        "Delete Brand Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete brand"
      );
    }
  };

  // =====================================================
  // CLOSE MODALS
  // =====================================================

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);

    setSelectedBrand(null);
    setError("");

    reset({
      name: "",
      status: "Active",
      description: "",
    });
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[300px] w-full items-center justify-center">
        <div className="h-7 w-7 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-w-0 w-full bg-background">
      <div className="w-full space-y-4">

        {/* =================================================
            BRANDS
        ================================================= */}

        <div className="overflow-hidden rounded-md border border-border bg-card shadow-sm">

          {/* HEADER */}

          <div className="flex items-center justify-between border-b border-border p-4">

            <div className="min-w-0">
              <h1 className="text-lg font-semibold text-foreground">
                Brands
              </h1>

              <p className="mt-1 text-xs text-muted-foreground">
                Manage product brands
              </p>
            </div>

           <button
              type="button"
              onClick={openAddModal}
              className="flex h-9 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover sm:w-auto"
            >
              <Plus size={16} />

              <span className="hidden sm:inline">
                Add Brand
              </span>
            </button>

          </div>

          {/* SEARCH + FILTER */}

          <div className="flex items-center gap-2 border-b border-border p-4">

            <div className="relative min-w-0 flex-1 sm:max-w-xs">

              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <input
                value={search}
                onChange={(e) =>
                  handleSearch(e.target.value)
                }
                placeholder="Search brands..."
                className="h-10 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

            </div>

            <div className="relative">

              <SlidersHorizontal
                size={15}
                className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-muted-foreground sm:left-3 sm:translate-x-0"
              />

              <select
                value={status}
                onChange={(e) =>
                  handleStatus(e.target.value)
                }
                className="h-10 w-10 cursor-pointer appearance-none rounded-md border border-border bg-background text-transparent outline-none focus:border-primary sm:w-40 sm:pl-9 sm:pr-8 sm:text-sm sm:text-foreground"
              >
                <option value="All Status">
                  All Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>

                <option value="Archived">
                  Archived
                </option>
              </select>

            </div>

          </div>

          {/* FETCH ERROR */}

          {error &&
            !showAddModal &&
            !showEditModal &&
            !showDeleteModal && (
              <div className="flex items-start justify-between gap-3 border-b border-border bg-red-50 px-4 py-3 text-xs text-red-600">

                <span>{error}</span>

                <button
                  onClick={() => setError("")}
                  className="shrink-0"
                >
                  <X size={14} />
                </button>

              </div>
            )}

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

                {currentItems.map(
                  (brand, index) => {

                    const rowNumber = showAll
                      ? index + 1
                      : (page - 1) *
                          ITEMS_PER_PAGE +
                        index +
                        1;

                    return (
                      <tr
                        key={brand._id}
                        className="border-b border-border transition-colors hover:bg-muted/30"
                      >

                        <td className="px-3 py-2.5 text-center text-[11px] text-muted-foreground">
                          {rowNumber}
                        </td>

                        <td className="px-3 py-2.5">

                          <div className="flex items-center gap-2">

                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                              <Tag size={14} />
                            </div>

                            <div className="min-w-0">

                              <span className="block truncate text-xs font-medium text-foreground">
                                {brand.name}
                              </span>

                              {brand.description && (
                                <span className="block max-w-[260px] truncate text-[10px] text-muted-foreground">
                                  {brand.description}
                                </span>
                              )}

                            </div>

                          </div>

                        </td>

                        <td className="px-3 py-2.5 text-center text-xs text-muted-foreground">
                          {brand.products ?? 0}
                        </td>

                        <td className="px-3 py-2.5 text-center">

                          <span
                            className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium ${
                              statusStyle[
                                brand.status
                              ] ||
                              "bg-muted text-muted-foreground"
                            }`}
                          >
                            {brand.status ||
                              "Active"}
                          </span>

                        </td>

                        <td className="px-3 py-2.5">

                          <div className="flex justify-center gap-1.5">

                            {/* VIEW */}

                            <button
                              onClick={() =>
                                navigate(
                                  `/brands/${brand._id}`
                                )
                              }
                              className="rounded-md border border-border p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-primary"
                              title="View"
                            >
                              <Eye size={13} />
                            </button>

                            {/* EDIT */}

                            <button
                              onClick={() =>
                                openEditModal(brand)
                              }
                              className="rounded-md border border-border p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                              title="Edit"
                            >
                              <Pencil size={13} />
                            </button>

                            {/* DELETE */}

                            <button
                              onClick={() =>
                                openDeleteModal(brand)
                              }
                              className="rounded-md bg-red-100 p-1.5 text-red-600 transition hover:bg-red-200"
                              title="Delete"
                            >
                              <Trash2 size={13} />
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>

          {/* EMPTY */}

          {currentItems.length === 0 && (
            <div className="py-14 text-center">

              <Tag
                size={32}
                className="mx-auto text-muted-foreground"
              />

              <p className="mt-3 text-sm font-medium text-foreground">
                No brands found
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Try changing your search or filter.
              </p>

              <button
                onClick={handleShowAll}
                className="mt-4 rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary-hover"
              >
                Show All Brands
              </button>

            </div>
          )}

          {/* PAGINATION */}

          {!showAll &&
            filtered.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-border p-4 sm:flex-row sm:items-center sm:justify-between">

                <p className="text-[11px] text-muted-foreground sm:text-xs">

                  Showing{" "}

                  <span className="font-medium text-foreground">
                    {(page - 1) *
                      ITEMS_PER_PAGE +
                      1}
                  </span>

                  {" "}to{" "}

                  <span className="font-medium text-foreground">
                    {Math.min(
                      page *
                        ITEMS_PER_PAGE,
                      filtered.length
                    )}
                  </span>

                  {" "}of{" "}

                  <span className="font-medium text-foreground">
                    {filtered.length}
                  </span>{" "}
                  brands

                </p>

                <div className="flex items-center gap-1">

                  <button
                    disabled={page === 1}
                    onClick={() =>
                      setPage(
                        (prev) => prev - 1
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted disabled:opacity-40"
                  >
                    <ChevronLeft size={14} />
                  </button>

                  {Array.from(
                    {
                      length: totalPages,
                    },
                    (_, i) => i + 1
                  ).map((number) => (
                    <button
                      key={number}
                      onClick={() =>
                        setPage(number)
                      }
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
                    disabled={
                      page === totalPages ||
                      totalPages === 0
                    }
                    onClick={() =>
                      setPage(
                        (prev) => prev + 1
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted disabled:opacity-40"
                  >
                    <ChevronRight size={14} />
                  </button>

                </div>

              </div>
            )}

          {/* SHOW ALL */}

          {showAll &&
            filtered.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-border p-4 sm:flex-row sm:items-center sm:justify-between">

                <p className="text-xs text-muted-foreground">
                  Showing all{" "}

                  <span className="font-medium text-foreground">
                    {filtered.length}
                  </span>{" "}
                  brands
                </p>

                <button
                  onClick={
                    handleShowPagination
                  }
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
              Brands Overview
            </h2>

            <button
              onClick={
                showAll
                  ? handleShowPagination
                  : handleShowAll
              }
              className="text-xs font-medium text-primary hover:underline"
            >
              {showAll
                ? "Show Pagination"
                : "Show All"}
            </button>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* CHART */}

            <div className="flex items-center justify-center gap-5 border-b border-border p-5 md:border-b-0 md:border-r">

              <div
                className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(
                    var(--primary) 0 ${activePercent}%,
                    var(--secondary) ${activePercent}% ${
                      activePercent +
                      inactivePercent
                    }%,
                    var(--muted) ${
                      activePercent +
                      inactivePercent
                    }% 100%
                  )`,
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
                  <Tag
                    size={32}
                    className="text-primary"
                  />
                </div>

                <p className="mx-auto mt-3 max-w-[180px] text-[11px] leading-5 text-muted-foreground">
                  Keep your product brands organized and easy to manage.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          ADD / EDIT MODAL
      ================================================= */}

      {(showAddModal ||
        showEditModal) && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm"
          onMouseDown={closeModals}
        >

          <div
            className="w-full max-w-md rounded-md border border-border bg-card shadow-xl"
            onMouseDown={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-border p-4">

              <div>

                <h2 className="text-base font-semibold text-foreground">
                  {showAddModal
                    ? "Add Brand"
                    : "Edit Brand"}
                </h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  {showAddModal
                    ? "Create a new product brand."
                    : "Update brand information."}
                </p>

              </div>

              <button
                type="button"
                onClick={closeModals}
                disabled={isSubmitting}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={18} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit(
                showAddModal
                  ? handleAddBrand
                  : handleEditBrand
              )}
              className="space-y-4 p-4"
            >

              {/* NAME */}

              <div>

                <label className="mb-1.5 block text-xs font-medium text-foreground">
                  Brand Name
                </label>

                <input
                  {...register("name", {
                    required:
                      "Brand name is required",

                    minLength: {
                      value: 2,
                      message:
                        "Brand name must be at least 2 characters",
                    },

                    validate: (value) =>
                      value.trim().length > 0 ||
                      "Brand name is required",
                  })}
                  placeholder="Enter brand name"
                  autoFocus
                  disabled={isSubmitting}
                  className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
                />

                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}

              </div>

              {/* STATUS */}

              <div>

                <label className="mb-1.5 block text-xs font-medium text-foreground">
                  Status
                </label>

                <select
                  {...register("status", {
                    required:
                      "Status is required",
                  })}
                  disabled={isSubmitting}
                  className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
                >

                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>

                  <option value="Archived">
                    Archived
                  </option>

                </select>

                {errors.status && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.status.message}
                  </p>
                )}

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="mb-1.5 block text-xs font-medium text-foreground">
                  Description

                  <span className="ml-1 text-[10px] font-normal text-muted-foreground">
                    (Optional)
                  </span>

                </label>

                <textarea
                  {...register("description")}
                  placeholder="Enter brand description"
                  rows={3}
                  disabled={isSubmitting}
                  className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
                />

              </div>

              {/* FORM ERROR */}

              {error && (
                <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">

                  <span className="flex-1">
                    {error}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setError("")
                    }
                    disabled={isSubmitting}
                  >
                    <X size={14} />
                  </button>

                </div>
              )}

              {/* BUTTONS */}

              <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeModals}
                  disabled={isSubmitting}
                  className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />

                      {showAddModal
                        ? "Creating..."
                        : "Saving..."}
                    </>
                  ) : (
                    <>
                      {showAddModal
                        ? "Create Brand"
                        : "Save Changes"}
                    </>
                  )}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* =================================================
          DELETE MODAL
      ================================================= */}

      {showDeleteModal &&
        selectedBrand && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm"
          onMouseDown={closeModals}
        >

          <div
            className="w-full max-w-sm rounded-md border border-border bg-card p-5 shadow-xl"
            onMouseDown={(e) =>
              e.stopPropagation()
            }
          >

            {/* DELETE ICON */}

            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-red-100 text-red-600">
              <Trash2 size={20} />
            </div>

            {/* TITLE */}

            <h2 className="mt-4 text-base font-semibold text-foreground">
              Delete Brand?
            </h2>

            {/* DESCRIPTION */}

            <p className="mt-2 text-sm leading-5 text-muted-foreground">

              Are you sure you want to delete{" "}

              <span className="font-medium text-foreground">
                "{selectedBrand.name}"
              </span>

              ?

            </p>

            {/* WARNING */}

            <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3">

              <div className="flex gap-2">

                <Trash2
                  size={16}
                  className="mt-0.5 shrink-0 text-red-600"
                />

                <div>

                  <p className="text-xs font-semibold text-red-700">
                    All related products will also be deleted.
                  </p>

                  <p className="mt-1 text-xs leading-5 text-red-600">
                    This action cannot be undone.
                  </p>

                </div>

              </div>

            </div>

            {/* DELETE ERROR */}

            {error && (
              <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                {error}
              </div>
            )}

            {/* ACTIONS */}

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={closeModals}
                disabled={isSubmitting}
                className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteBrand}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={15} />
                    Delete Brand
                  </>
                )}

              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Brands;