import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Camera,
  CameraOff,
  ImagePlus,
  Package,
  Save,
  ScanBarcode,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BrowserMultiFormatReader } from "@zxing/browser";
import RecentProducts from "./RecentProducts";

// constants/productsData.js

export const initialProducts = [
  {
    id: 1,
    name: "Paracetamol 650mg",
    description: "Pain relief medicine",
    sku: "MED-1001",
    category: "Medicine",
    brand: "Cipla",
    price: 40,
    sellPrice: 50,
    discount: 20,
    stock: 120,
    status: "In Stock",
    image: "",
  },
  {
    id: 2,
    name: "Azithromycin 500mg",
    description: "Antibiotic medicine",
    sku: "MED-1002",
    category: "Medicine",
    brand: "Sun Pharma",
    price: 85,
    sellPrice: 110,
    discount: 23,
    stock: 15,
    status: "Low Stock",
    image: "",
  },
  {
    id: 3,
    name: "Vitamin C Tablets",
    description: "Vitamin supplement",
    sku: "SUP-1003",
    category: "Supplement",
    brand: "HealthKart",
    price: 120,
    sellPrice: 149,
    discount: 19,
    stock: 75,
    status: "In Stock",
    image: "",
  },
];

const AddProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(initialProducts);

  // =========================================================
  // STATE
  // =========================================================

  const [imagePreview, setImagePreview] = useState(null);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scannerError, setScannerError] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const videoRef = useRef(null);
  const readerRef = useRef(null);
  const controlsRef = useRef(null);

  // =========================================================
  // REACT HOOK FORM
  // =========================================================

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      sku: "",
      description: "",
      category: "",
      brand: "",

      barcodeNumber: "",
      mfgDate: "",
      expDate: "",

      purchasePrice: "",
      sellPrice: "",
      discount: "",
      stock: "",
      lowStockLimit: "",

      image: null,
    },

    mode: "onBlur",
  });

  // =========================================================
  // WATCH
  // =========================================================

  const name = watch("name");
  const sku = watch("sku");
  const brand = watch("brand");
  const category = watch("category");

  const barcodeNumber = watch("barcodeNumber");

  const mfgDate = watch("mfgDate");
  const expDate = watch("expDate");

  const purchasePrice = watch("purchasePrice");
  const sellPrice = watch("sellPrice");

  const discount = watch("discount");
  const stock = watch("stock");

  // =========================================================
  // COMMON INPUT STYLE
  // =========================================================

  const inputClass = (error) => `
    h-9 w-full rounded-md
    border
    ${error ? "border-red-500" : "border-border"}
    bg-background
    px-3
    text-xs text-foreground
    outline-none
    placeholder:text-secondary
    transition-colors
    ${error ? "focus:border-red-500" : "focus:border-primary"}
  `;

  const selectClass = (error) => `
    h-9 w-full rounded-md
    border
    ${error ? "border-red-500" : "border-border"}
    bg-background
    px-3
    text-xs text-foreground
    outline-none
    transition-colors
    ${error ? "focus:border-red-500" : "focus:border-primary"}
  `;

  // =========================================================
  // ERROR
  // =========================================================

  const FieldError = ({ error }) => {
    if (!error) return null;

    return (
      <p className="mt-1 text-[9px] font-medium text-red-500">
        {error.message}
      </p>
    );
  };

  // =========================================================
  // IMAGE
  // =========================================================

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      return;
    }

    setValue("image", file, {
      shouldDirty: true,
      shouldValidate: true,
    });

    const url = URL.createObjectURL(file);

    setImagePreview(url);
  };

  const removeImage = () => {
    setValue("image", null);

    setImagePreview(null);
  };

  // =========================================================
  // STOP CAMERA
  // =========================================================

  const stopScanner = () => {
    try {
      if (controlsRef.current) {
        controlsRef.current.stop();
      }
    } catch (error) {
      console.log("Controls stop:", error);
    }

    controlsRef.current = null;

    try {
      if (readerRef.current) {
        readerRef.current.reset();
      }
    } catch (error) {
      console.log("Reader reset:", error);
    }

    readerRef.current = null;

    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      videoRef.current.srcObject = null;
    }

    setIsScanning(false);
  };

  // =========================================================
  // OPEN SCANNER
  // =========================================================

  const openScanner = () => {
    setScannerError("");
    setScannerOpen(true);
  };

  // =========================================================
  // CLOSE SCANNER
  // =========================================================

  const closeScanner = () => {
    stopScanner();

    setScannerOpen(false);
    setScannerError("");
  };

  // =========================================================
  // START SCANNER
  // =========================================================

  useEffect(() => {
    if (!scannerOpen) {
      return;
    }

    let active = true;

    const startScanner = async () => {
      try {
        setScannerError("");
        setIsScanning(false);

        const reader = new BrowserMultiFormatReader();

        readerRef.current = reader;

        // ---------------------------------------------
        // Get cameras
        // ---------------------------------------------

        const devices = await BrowserMultiFormatReader.listVideoInputDevices();

        if (!active) return;

        if (!devices || devices.length === 0) {
          throw new Error("No camera found.");
        }

        console.log("Available cameras:", devices);

        // ---------------------------------------------
        // Prefer back camera
        // ---------------------------------------------

        let selectedCamera = devices.find((device) =>
          /back|rear|environment/i.test(device.label),
        );

        // Fallback
        if (!selectedCamera) {
          selectedCamera = devices[devices.length - 1];
        }

        console.log("Selected camera:", selectedCamera);

        // ---------------------------------------------
        // Wait for video element
        // ---------------------------------------------

        if (!videoRef.current) {
          throw new Error("Video element not available.");
        }

        // ---------------------------------------------
        // Start scanner
        // ---------------------------------------------

        const controls = await reader.decodeFromVideoDevice(
          selectedCamera.deviceId,
          videoRef.current,
          (result, error) => {
            if (!active) return;

            // ---------------------------------------
            // BARCODE FOUND
            // ---------------------------------------

            if (result) {
              const text = result.getText().trim();

              console.log("================================");

              console.log("BARCODE DETECTED:", text);

              console.log("FORMAT:", result.getBarcodeFormat());

              console.log("================================");

              if (!text) {
                return;
              }

              // -------------------------------------
              // Fill React Hook Form
              // -------------------------------------

              setValue("barcodeNumber", text, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });

              // -------------------------------------
              // Close scanner
              // -------------------------------------

              closeScanner();

              return;
            }

            // ---------------------------------------
            // IMPORTANT
            // Don't show every failed frame
            // ---------------------------------------

            if (error) {
              // Normal while scanning.
              // ZXing continuously tries frames.
            }
          },
        );

        if (!active) {
          try {
            controls.stop();
          } catch {
            // ignore
          }

          return;
        }

        controlsRef.current = controls;

        setIsScanning(true);
      } catch (error) {
        console.error("Barcode scanner error:", error);

        if (!active) return;

        setIsScanning(false);

        setScannerError(
          "Unable to start camera. Please allow camera permission and try again.",
        );
      }
    };

    startScanner();

    return () => {
      active = false;

      stopScanner();
    };
  }, [scannerOpen, setValue]);

  // =========================================================
  // SUBMIT
  // =========================================================

  const onSubmit = async (data) => {
    console.log("================================");
    console.log("PRODUCT DATA");
    console.log("================================");
    console.log(data);

    /*
      API example:

      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("sku", data.sku);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("brand", data.brand);

      formData.append(
        "barcodeNumber",
        data.barcodeNumber
      );

      formData.append("mfgDate", data.mfgDate);
      formData.append("expDate", data.expDate);

      formData.append(
        "purchasePrice",
        data.purchasePrice
      );

      formData.append(
        "sellPrice",
        data.sellPrice
      );

      formData.append("discount", data.discount);
      formData.append("stock", data.stock);

      formData.append(
        "lowStockLimit",
        data.lowStockLimit
      );

      if (data.image) {
        formData.append("image", data.image);
      }

      await createProduct(formData);
    */

    navigate("/products");
  };

  // =========================================================
  // JSX
  // =========================================================

  return (
    <div className="min-h-full space-y-4 bg-background text-foreground">
      <section>
        {/* =====================================================
          HEADER
      ===================================================== */}

        <div className="flex items-center justify-between">
          {/* LEFT */}

          <div className="flex items-center gap-3 mb-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="
              flex h-8 w-8 items-center justify-center
              rounded-md border border-border
              text-secondary
              transition-colors
              hover:bg-muted
              hover:text-foreground
            "
            >
              <ArrowLeft size={15} />
            </button>

            <div>
              <h1 className="text-base font-semibold">Add Product</h1>

              <p className="mt-0.5 text-[10px] text-secondary">
                Add a new product to your inventory
              </p>
            </div>
          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="
              hidden h-8 items-center gap-1.5
              rounded-md border border-border
              px-3
              text-xs font-medium
              text-secondary
              transition-colors
              hover:bg-muted
              hover:text-foreground
              sm:flex
            "
            >
              <X size={13} />
              Cancel
            </button>

            <button
              type="submit"
              form="add-product-form"
              disabled={isSubmitting}
              className="
              flex h-8 items-center gap-1.5
              rounded-md
              bg-primary
              px-3
              text-xs font-medium
              text-primary-foreground
              transition-opacity
              hover:opacity-90
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            >
              <Save size={13} />

              {isSubmitting ? "Saving..." : "Save Product"}
            </button>
          </div>
        </div>

        {/* =====================================================
          FORM
      ===================================================== */}

        <form
          id="add-product-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="grid grid-cols-1 gap-4 lg:grid-cols-3"
        >
          {/* ===================================================
            LEFT COLUMN
        =================================================== */}

          <div className="space-y-4 lg:col-span-2">
            {/* =================================================
              BASIC INFORMATION
          ================================================= */}

            <section className="rounded-lg border border-border bg-card">
              <div className="border-b border-border px-4 py-3">
                <h2 className="text-xs font-semibold">Basic Information</h2>

                <p className="mt-0.5 text-[10px] text-secondary">
                  Enter the basic details of your product.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
                {/* NAME */}

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                    Product Name *
                  </label>

                  <input
                    type="text"
                    placeholder="Enter product name"
                    className={inputClass(errors.name)}
                    {...register("name", {
                      required: "Product name is required.",

                      minLength: {
                        value: 2,
                        message: "Product name must be at least 2 characters.",
                      },

                      maxLength: {
                        value: 100,
                        message: "Product name cannot exceed 100 characters.",
                      },
                    })}
                  />

                  <FieldError error={errors.name} />
                </div>

                {/* SKU */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                    SKU *
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. MED-1001"
                    className={inputClass(errors.sku)}
                    {...register("sku", {
                      required: "SKU is required.",

                      minLength: {
                        value: 3,
                        message: "SKU must be at least 3 characters.",
                      },
                    })}
                  />

                  <FieldError error={errors.sku} />
                </div>

                {/* BRAND */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                    Brand *
                  </label>

                  <select
                    className={selectClass(errors.brand)}
                    {...register("brand", {
                      required: "Please select a brand.",
                    })}
                  >
                    <option value="">Select brand</option>

                    <option value="Himalaya">Himalaya</option>

                    <option value="Dove">Dove</option>

                    <option value="Colgate">Colgate</option>

                    <option value="Dettol">Dettol</option>

                    <option value="Parle">Parle</option>

                    <option value="Tata">Tata</option>

                    <option value="Fortune">Fortune</option>

                    <option value="Surf Excel">Surf Excel</option>
                  </select>

                  <FieldError error={errors.brand} />
                </div>

                {/* CATEGORY */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                    Category *
                  </label>

                  <select
                    className={selectClass(errors.category)}
                    {...register("category", {
                      required: "Please select a category.",
                    })}
                  >
                    <option value="">Select category</option>

                    <option value="Medicine">Medicine</option>

                    <option value="Personal Care">Personal Care</option>

                    <option value="Groceries">Groceries</option>

                    <option value="Home Care">Home Care</option>
                  </select>

                  <FieldError error={errors.category} />
                </div>

                {/* DESCRIPTION */}

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                    Description
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Enter product description..."
                    className={`
                    w-full resize-none rounded-md
                    border
                    ${errors.description ? "border-red-500" : "border-border"}
                    bg-background
                    px-3 py-2
                    text-xs text-foreground
                    outline-none
                    placeholder:text-secondary
                    ${
                      errors.description
                        ? "focus:border-red-500"
                        : "focus:border-primary"
                    }
                  `}
                    {...register("description", {
                      maxLength: {
                        value: 500,
                        message: "Description cannot exceed 500 characters.",
                      },
                    })}
                  />

                  <FieldError error={errors.description} />
                </div>
              </div>
            </section>

            {/* =================================================
              IDENTIFICATION
          ================================================= */}

            <section className="rounded-lg border border-border bg-card">
              <div className="border-b border-border px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <ScanBarcode size={14} />
                  </div>

                  <div>
                    <h2 className="text-xs font-semibold">
                      Product Identification & Dates
                    </h2>

                    <p className="mt-0.5 text-[10px] text-secondary">
                      Scan or manually enter product information.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* BARCODE */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                    Barcode *
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter barcode"
                      inputMode="numeric"
                      className={inputClass(errors.barcodeNumber)}
                      {...register("barcodeNumber", {
                        required: "Barcode is required.",

                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Barcode must contain only numbers.",
                        },

                        minLength: {
                          value: 8,
                          message: "Barcode must be at least 8 digits.",
                        },
                      })}
                    />

                    <button
                      type="button"
                      onClick={openScanner}
                      title="Scan barcode"
                      className="
                      flex h-9 w-10 shrink-0
                      items-center justify-center
                      rounded-md
                      border border-border
                      bg-background
                      text-secondary
                      transition-colors
                      hover:border-primary
                      hover:bg-primary/5
                      hover:text-primary
                    "
                    >
                      <Camera size={16} />
                    </button>
                  </div>

                  <FieldError error={errors.barcodeNumber} />

                  <p className="mt-1 text-[9px] text-secondary">
                    Scan with camera or enter manually.
                  </p>
                </div>

                {/* MFG DATE */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                    Mfg Date *
                  </label>

                  <input
                    type="date"
                    className={inputClass(errors.mfgDate)}
                    {...register("mfgDate", {
                      required: "Manufacturing date is required.",
                    })}
                  />

                  <FieldError error={errors.mfgDate} />
                </div>

                {/* EXP DATE */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                    Exp Date *
                  </label>

                  <input
                    type="date"
                    min={mfgDate || undefined}
                    className={inputClass(errors.expDate)}
                    {...register("expDate", {
                      required: "Expiry date is required.",

                      validate: (value) => {
                        if (mfgDate && value < mfgDate) {
                          return "Expiry date must be after Mfg date.";
                        }

                        return true;
                      },
                    })}
                  />

                  <FieldError error={errors.expDate} />
                </div>
              </div>
            </section>

            {/* =================================================
              PRICING
          ================================================= */}

            <section className="rounded-lg border border-border bg-card">
              <div className="border-b border-border px-4 py-3">
                <h2 className="text-xs font-semibold">Pricing & Inventory</h2>

                <p className="mt-0.5 text-[10px] text-secondary">
                  Set pricing, discount and stock information.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
                {/* PURCHASE PRICE */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                    Purchase Price *
                  </label>

                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-secondary">
                      ₹
                    </span>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className={`${inputClass(errors.purchasePrice)} pl-7`}
                      {...register("purchasePrice", {
                        required: "Purchase price is required.",

                        valueAsNumber: true,

                        min: {
                          value: 0,
                          message: "Purchase price cannot be negative.",
                        },
                      })}
                    />
                  </div>

                  <FieldError error={errors.purchasePrice} />
                </div>

                {/* SELL PRICE */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                    Sell Price *
                  </label>

                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-secondary">
                      ₹
                    </span>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className={`${inputClass(errors.sellPrice)} pl-7`}
                      {...register("sellPrice", {
                        required: "Sell price is required.",

                        valueAsNumber: true,

                        min: {
                          value: 0,
                          message: "Sell price cannot be negative.",
                        },
                      })}
                    />
                  </div>

                  <FieldError error={errors.sellPrice} />
                </div>

                {/* DISCOUNT */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                    Discount
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      placeholder="0"
                      className={`${inputClass(errors.discount)} pr-8`}
                      {...register("discount", {
                        valueAsNumber: true,

                        min: {
                          value: 0,
                          message: "Discount cannot be negative.",
                        },

                        max: {
                          value: 100,
                          message: "Discount cannot exceed 100%.",
                        },
                      })}
                    />

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-secondary">
                      %
                    </span>
                  </div>

                  <FieldError error={errors.discount} />
                </div>

                {/* STOCK */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                    Stock Quantity *
                  </label>

                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    className={inputClass(errors.stock)}
                    {...register("stock", {
                      required: "Stock quantity is required.",

                      valueAsNumber: true,

                      min: {
                        value: 0,
                        message: "Stock cannot be negative.",
                      },
                    })}
                  />

                  <FieldError error={errors.stock} />
                </div>

                {/* LOW STOCK */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                    Low Stock Alert
                  </label>

                  <input
                    type="number"
                    min="0"
                    placeholder="20"
                    className={inputClass(errors.lowStockLimit)}
                    {...register("lowStockLimit", {
                      valueAsNumber: true,

                      min: {
                        value: 0,
                        message: "Low stock limit cannot be negative.",
                      },
                    })}
                  />

                  <FieldError error={errors.lowStockLimit} />
                </div>
              </div>
            </section>
          </div>

          {/* ===================================================
            RIGHT COLUMN
        =================================================== */}

          <div className="space-y-4">
            {/* =================================================
              IMAGE
          ================================================= */}

            <section className="rounded-lg border border-border bg-card">
              <div className="border-b border-border px-4 py-3">
                <h2 className="text-xs font-semibold">Product Image</h2>

                <p className="mt-0.5 text-[10px] text-secondary">
                  Upload an image for your product.
                </p>
              </div>

              <div className="p-4">
                <label
                  className="
                  flex h-52 cursor-pointer
                  flex-col items-center justify-center
                  rounded-lg
                  border border-dashed border-border
                  bg-background
                  transition-colors
                  hover:border-primary/50
                  hover:bg-primary/5
                "
                >
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  {imagePreview ? (
                    <div className="flex flex-col items-center">
                      <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg border border-border">
                        <img
                          src={imagePreview}
                          alt="Product preview"
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <p className="mt-2 text-[10px] text-secondary">
                        Image selected
                      </p>

                      <button
                        type="button"
                        onClick={(event) => {
                          event.preventDefault();
                          removeImage();
                        }}
                        className="
                        mt-2 text-[10px]
                        font-medium text-red-500
                        hover:underline
                      "
                      >
                        Remove image
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <ImagePlus size={18} />
                      </div>

                      <p className="mt-2 text-[10px] font-medium">
                        Upload product image
                      </p>

                      <p className="mt-1 text-[9px] text-secondary">
                        PNG, JPG or WEBP
                      </p>

                      <p className="mt-0.5 text-[9px] text-secondary">
                        Maximum 5MB
                      </p>
                    </>
                  )}
                </label>
              </div>
            </section>

            {/* =================================================
              PREVIEW
          ================================================= */}

            <section className="rounded-lg border border-border bg-card">
              <div className="border-b border-border px-4 py-3">
                <h2 className="text-xs font-semibold">Product Preview</h2>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Package size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold">
                      {name || "Product Name"}
                    </p>

                    <p className="mt-0.5 text-[10px] text-secondary">
                      {brand || "Brand"}
                      {" • "}
                      {category || "Category"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[9px] text-secondary">SKU</p>

                    <p className="mt-0.5 truncate text-xs font-semibold">
                      {sku || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] text-secondary">Sell Price</p>

                    <p className="mt-0.5 text-xs font-semibold">
                      ₹{sellPrice || "0.00"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] text-secondary">Stock</p>

                    <p className="mt-0.5 text-xs font-semibold">
                      {stock || "0"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] text-secondary">Discount</p>

                    <p className="mt-0.5 text-xs font-semibold">
                      {discount || "0"}%
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] text-secondary">Barcode</p>

                    <p className="mt-0.5 truncate text-xs font-semibold">
                      {barcodeNumber || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] text-secondary">Expiry</p>

                    <p className="mt-0.5 text-xs font-semibold">
                      {expDate || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </form>

        {/* =====================================================
          BARCODE SCANNER MODAL
      ===================================================== */}

        {scannerOpen && (
          <div
            className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/70
            p-4
            backdrop-blur-sm
          "
          >
            <div
              className="
              w-full max-w-md
              overflow-hidden
              rounded-xl
              border border-border
              bg-card
              shadow-xl
            "
            >
              {/* HEADER */}

              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <ScanBarcode size={16} />
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold">Scan Barcode</h3>

                    <p className="text-[9px] text-secondary">
                      Point the camera at a product barcode
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeScanner}
                  className="
                  flex h-7 w-7
                  items-center justify-center
                  rounded-md
                  text-secondary
                  hover:bg-muted
                  hover:text-foreground
                "
                >
                  <X size={15} />
                </button>
              </div>

              {/* BODY */}

              <div className="p-4">
                {/* CAMERA */}

                <div className="relative overflow-hidden rounded-lg bg-black">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="
                    block
                    min-h-[280px]
                    w-full
                    object-cover
                  "
                  />

                  {/* SCAN OVERLAY */}

                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div
                      className="
                      relative
                      h-28
                      w-[82%]
                      rounded-lg
                      border-2
                      border-primary
                    "
                    >
                      <div className="absolute -left-0.5 -top-0.5 h-5 w-5 border-l-4 border-t-4 border-primary" />

                      <div className="absolute -right-0.5 -top-0.5 h-5 w-5 border-r-4 border-t-4 border-primary" />

                      <div className="absolute -bottom-0.5 -left-0.5 h-5 w-5 border-b-4 border-l-4 border-primary" />

                      <div className="absolute -bottom-0.5 -right-0.5 h-5 w-5 border-b-4 border-r-4 border-primary" />

                      <div className="absolute left-2 right-2 top-1/2 h-px bg-primary" />
                    </div>
                  </div>

                  {/* LOADING */}

                  {!isScanning && !scannerError && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-md bg-black/60 px-3 py-2">
                        <p className="text-[10px] text-white">
                          Starting camera...
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* ERROR */}

                {scannerError && (
                  <div className="mt-3 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2">
                    <p className="text-[10px] leading-4 text-red-500">
                      {scannerError}
                    </p>
                  </div>
                )}

                {/* INFO */}

                {!scannerError && (
                  <div className="mt-3 flex items-start gap-2 rounded-md bg-muted/50 p-3">
                    <Camera
                      size={14}
                      className="mt-0.5 shrink-0 text-secondary"
                    />

                    <div>
                      <p className="text-[10px] font-medium">How to scan</p>

                      <p className="mt-0.5 text-[9px] leading-4 text-secondary">
                        Keep the complete barcode inside the box. Use good
                        lighting and hold the camera steady.
                      </p>
                    </div>
                  </div>
                )}

                {/* CLOSE */}

                <button
                  type="button"
                  onClick={closeScanner}
                  className="
                  mt-3
                  flex h-9 w-full
                  items-center justify-center
                  gap-2
                  rounded-md
                  border border-border
                  text-xs font-medium
                  text-secondary
                  transition-colors
                  hover:bg-muted
                  hover:text-foreground
                "
                >
                  <CameraOff size={14} />
                  Close Scanner
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <section>
        <RecentProducts products={products.slice(0, 5)} />
      </section>
    </div>
  );
};

export default AddProduct;
