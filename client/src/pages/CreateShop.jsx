import React, { useState } from "react";
import {
  Store,
  Upload,
  MapPin,
  Phone,
  Mail,
  User,
  FileText,
  Save,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateShop = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shopName: "",
    ownerName: "",
    mobile: "",
    email: "",
    shopType: "",
    gstNumber: "",
    fssaiNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setLogo(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Shop Data:", formData);
    console.log("Shop Logo:", logo);

    // API call will go here

    // navigate("/your-shop");
  };

  return (
    <div className="min-h-full bg-background text-foreground">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold">
            Create Your Shop
          </h1>

          <p className="mt-0.5 text-[10px] text-secondary">
            Add your shop information to start using the billing system.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="
            flex
            h-8
            items-center
            gap-1.5
            rounded-md
            border
            border-border
            px-3
            text-[10px]
            font-medium
            text-secondary
            transition-colors
            hover:bg-muted
            hover:text-foreground
          "
        >
          <ArrowLeft size={13} />
          Back
        </button>
      </div>

      {/* =====================================================
          FORM
      ===================================================== */}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* ===================================================
            SHOP BASIC INFORMATION
        =================================================== */}

        <section
          className="
            overflow-hidden
            rounded-md
            border
            border-border
            bg-card
          "
        >
          {/* Section Header */}

          <div
            className="
              border-b
              border-border
              px-4
              py-3
            "
          >
            <div className="flex items-center gap-2">
              <div
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-md
                  bg-primary/10
                  text-primary
                "
              >
                <Store size={14} />
              </div>

              <div>
                <h2 className="text-xs font-semibold">
                  Shop Information
                </h2>

                <p className="text-[9px] text-secondary">
                  Basic information about your business.
                </p>
              </div>
            </div>
          </div>

          {/* Fields */}

          <div className="grid gap-4 p-4 md:grid-cols-2">
            {/* Shop Name */}

            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                Shop Name
                <span className="ml-1 text-red-500">
                  *
                </span>
              </label>

              <div className="relative">
                <Store
                  size={14}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-secondary
                  "
                />

                <input
                  type="text"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  placeholder="Enter shop name"
                  required
                  className="
                    h-9
                    w-full
                    rounded-md
                    border
                    border-border
                    bg-background
                    pl-9
                    pr-3
                    text-xs
                    outline-none
                    placeholder:text-secondary
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/10
                  "
                />
              </div>
            </div>

            {/* Shop Type */}

            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                Shop Type
                <span className="ml-1 text-red-500">
                  *
                </span>
              </label>

              <select
                name="shopType"
                value={formData.shopType}
                onChange={handleChange}
                required
                className="
                  h-9
                  w-full
                  rounded-md
                  border
                  border-border
                  bg-background
                  px-3
                  text-xs
                  text-foreground
                  outline-none
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/10
                "
              >
                <option value="">
                  Select shop type
                </option>

                <option value="Medical Store">
                  Medical Store
                </option>

                <option value="Pharmacy">
                  Pharmacy
                </option>

                <option value="Grocery Store">
                  Grocery Store
                </option>

                <option value="Retail Store">
                  Retail Store
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>
          </div>
        </section>

        {/* ===================================================
            OWNER INFORMATION
        =================================================== */}

        <section
          className="
            overflow-hidden
            rounded-md
            border
            border-border
            bg-card
          "
        >
          <div
            className="
              border-b
              border-border
              px-4
              py-3
            "
          >
            <div className="flex items-center gap-2">
              <div
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-md
                  bg-primary/10
                  text-primary
                "
              >
                <User size={14} />
              </div>

              <div>
                <h2 className="text-xs font-semibold">
                  Owner Information
                </h2>

                <p className="text-[9px] text-secondary">
                  Contact details of the shop owner.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-4 md:grid-cols-3">
            {/* Owner */}

            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                Owner Name
                <span className="ml-1 text-red-500">
                  *
                </span>
              </label>

              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                placeholder="Enter owner name"
                required
                className="
                  h-9
                  w-full
                  rounded-md
                  border
                  border-border
                  bg-background
                  px-3
                  text-xs
                  outline-none
                  placeholder:text-secondary
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/10
                "
              />
            </div>

            {/* Mobile */}

            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                Mobile Number
                <span className="ml-1 text-red-500">
                  *
                </span>
              </label>

              <div className="relative">
                <Phone
                  size={14}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-secondary
                  "
                />

                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="9876543210"
                  maxLength={10}
                  required
                  className="
                    h-9
                    w-full
                    rounded-md
                    border
                    border-border
                    bg-background
                    pl-9
                    pr-3
                    text-xs
                    outline-none
                    placeholder:text-secondary
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/10
                  "
                />
              </div>
            </div>

            {/* Email */}

            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={14}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-secondary
                  "
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="shop@example.com"
                  className="
                    h-9
                    w-full
                    rounded-md
                    border
                    border-border
                    bg-background
                    pl-9
                    pr-3
                    text-xs
                    outline-none
                    placeholder:text-secondary
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/10
                  "
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            BUSINESS / TAX INFORMATION
        =================================================== */}

        <section
          className="
            overflow-hidden
            rounded-md
            border
            border-border
            bg-card
          "
        >
          <div
            className="
              border-b
              border-border
              px-4
              py-3
            "
          >
            <div className="flex items-center gap-2">
              <div
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-md
                  bg-primary/10
                  text-primary
                "
              >
                <FileText size={14} />
              </div>

              <div>
                <h2 className="text-xs font-semibold">
                  Business Information
                </h2>

                <p className="text-[9px] text-secondary">
                  Tax and registration information.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-4 md:grid-cols-2">
            {/* GST */}

            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                GST Number
              </label>

              <input
                type="text"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                placeholder="Enter GST number"
                className="
                  h-9
                  w-full
                  rounded-md
                  border
                  border-border
                  bg-background
                  px-3
                  text-xs
                  uppercase
                  outline-none
                  placeholder:normal-case
                  placeholder:text-secondary
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/10
                "
              />
            </div>

            {/* FSSAI */}

            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                FSSAI Number
              </label>

              <input
                type="text"
                name="fssaiNumber"
                value={formData.fssaiNumber}
                onChange={handleChange}
                placeholder="Enter FSSAI number"
                className="
                  h-9
                  w-full
                  rounded-md
                  border
                  border-border
                  bg-background
                  px-3
                  text-xs
                  outline-none
                  placeholder:text-secondary
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/10
                "
              />
            </div>
          </div>
        </section>

        {/* ===================================================
            ADDRESS
        =================================================== */}

        <section
          className="
            overflow-hidden
            rounded-md
            border
            border-border
            bg-card
          "
        >
          <div
            className="
              border-b
              border-border
              px-4
              py-3
            "
          >
            <div className="flex items-center gap-2">
              <div
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-md
                  bg-primary/10
                  text-primary
                "
              >
                <MapPin size={14} />
              </div>

              <div>
                <h2 className="text-xs font-semibold">
                  Shop Address
                </h2>

                <p className="text-[9px] text-secondary">
                  Where your shop is located.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4">
            {/* Address */}

            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                Address
                <span className="ml-1 text-red-500">
                  *
                </span>
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter complete shop address"
                rows={3}
                required
                className="
                  w-full
                  resize-none
                  rounded-md
                  border
                  border-border
                  bg-background
                  px-3
                  py-2
                  text-xs
                  outline-none
                  placeholder:text-secondary
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/10
                "
              />
            </div>

            {/* City / State / PIN */}

            <div className="grid gap-4 md:grid-cols-3">
              {/* City */}

              <div>
                <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                  City
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Balasore"
                  required
                  className="
                    h-9
                    w-full
                    rounded-md
                    border
                    border-border
                    bg-background
                    px-3
                    text-xs
                    outline-none
                    placeholder:text-secondary
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/10
                  "
                />
              </div>

              {/* State */}

              <div>
                <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                  State
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="
                    h-9
                    w-full
                    rounded-md
                    border
                    border-border
                    bg-background
                    px-3
                    text-xs
                    outline-none
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/10
                  "
                >
                  <option value="">
                    Select state
                  </option>

                  <option value="Odisha">
                    Odisha
                  </option>

                  <option value="West Bengal">
                    West Bengal
                  </option>

                  <option value="Jharkhand">
                    Jharkhand
                  </option>

                  <option value="Chhattisgarh">
                    Chhattisgarh
                  </option>

                  <option value="Andhra Pradesh">
                    Andhra Pradesh
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              {/* PIN */}

              <div>
                <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                  PIN Code
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="756001"
                  maxLength={6}
                  required
                  className="
                    h-9
                    w-full
                    rounded-md
                    border
                    border-border
                    bg-background
                    px-3
                    text-xs
                    outline-none
                    placeholder:text-secondary
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/10
                  "
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            SHOP LOGO
        =================================================== */}

        <section
          className="
            overflow-hidden
            rounded-md
            border
            border-border
            bg-card
          "
        >
          <div
            className="
              border-b
              border-border
              px-4
              py-3
            "
          >
            <h2 className="text-xs font-semibold">
              Shop Logo
            </h2>

            <p className="text-[9px] text-secondary">
              Add your shop logo for invoices and branding.
            </p>
          </div>

          <div className="p-4">
            <label
              className="
                flex
                min-h-[110px]
                cursor-pointer
                items-center
                justify-center
                rounded-md
                border
                border-dashed
                border-border
                bg-background
                transition-colors
                hover:bg-muted/40
              "
            >
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Shop logo"
                  className="
                    h-24
                    w-24
                    rounded-md
                    object-contain
                  "
                />
              ) : (
                <div className="text-center">
                  <Upload
                    size={20}
                    className="mx-auto text-secondary"
                  />

                  <p className="mt-2 text-xs font-medium">
                    Upload Shop Logo
                  </p>

                  <p className="mt-1 text-[9px] text-secondary">
                    PNG, JPG up to 2MB
                  </p>
                </div>
              )}

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleLogoChange}
                className="hidden"
              />
            </label>
          </div>
        </section>

        {/* ===================================================
            ACTIONS
        =================================================== */}

        <div
          className="
            flex
            items-center
            justify-end
            gap-2
            rounded-md
            border
            border-border
            bg-card
            px-4
            py-3
          "
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              h-9
              rounded-md
              border
              border-border
              px-4
              text-xs
              font-medium
              text-secondary
              transition-colors
              hover:bg-muted
              hover:text-foreground
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            className="
              flex
              h-9
              items-center
              gap-2
              rounded-md
              bg-primary
              px-5
              text-xs
              font-semibold
              text-primary-foreground
              transition-opacity
              hover:opacity-90
            "
          >
            <Save size={14} />
            Create Shop
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateShop;