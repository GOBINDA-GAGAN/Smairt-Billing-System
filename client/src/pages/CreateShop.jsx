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
import { useForm } from "react-hook-form";
import { useShop } from "../context/ShopContex";


const CreateShop = () => {
  const navigate = useNavigate();


  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [error, setError] = useState("");
  const { shopCreate, loading } = useShop();

  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("Logo size must be less than 2MB");
      return;
    }

    setError("");
    setLogo(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    try {
      setError("");

      console.log("Shop Data:", data);
      console.log("Shop Logo:", logo);

      const response = await shopCreate(data);

      console.log("API Response:", response);

      reset();
      setLogo(null);
      setLogoPreview("");

      navigate("/");
    } catch (error) {
      console.error("Create shop failed:", error);

      setError(
        error?.response?.data?.message ||
          "Failed to create shop"
      );
    }
  };

  return (
    <div className="min-h-full bg-background text-foreground">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-base font-semibold">Create Your Shop</h1>
          <p className="mt-0.5 text-[10px] text-secondary">Add your shop information to start using the billing system.</p>
        </div>

        <button type="button" onClick={() => navigate(-1)} className="flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-border px-3 text-[10px] font-medium text-secondary transition-colors hover:bg-muted hover:text-foreground">
          <ArrowLeft size={13} />
          Back
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-500">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* SHOP INFORMATION */}
        <section className="overflow-hidden rounded-md border border-border bg-card">
          <div className="border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Store size={14} />
              </div>

              <div>
                <h2 className="text-xs font-semibold">Shop Information</h2>
                <p className="text-[9px] text-secondary">Basic information about your business.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-4 md:grid-cols-2">
            {/* NAME */}
            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                Shop Name <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                {...register("name", {
                  required: "Shop name is required",
                })}
                placeholder="Enter shop name"
                className="h-9 w-full rounded-md border border-border bg-background px-3 text-xs outline-none placeholder:text-secondary focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

              {errors.name && (
                <p className="mt-1 text-[9px] text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* TYPE */}
            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                Shop Type <span className="ml-1 text-red-500">*</span>
              </label>

              <select
                {...register("type", {
                  required: "Shop type is required",
                })}
                className="h-9 w-full rounded-md border border-border bg-background px-3 text-xs text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="">Select shop type</option>
                <option value="Medical Store">Medical Store</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Grocery Store">Grocery Store</option>
                <option value="Retail Store">Retail Store</option>
                <option value="Other">Other</option>
              </select>

              {errors.type && (
                <p className="mt-1 text-[9px] text-red-500">
                  {errors.type.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* OWNER INFORMATION */}
        <section className="overflow-hidden rounded-md border border-border bg-card">
          <div className="border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                <User size={14} />
              </div>

              <div>
                <h2 className="text-xs font-semibold">Owner Information</h2>
                <p className="text-[9px] text-secondary">Contact details of the shop owner.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-4 md:grid-cols-3">
            {/* OWNER */}
            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                Owner Name <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                {...register("ownerName", {
                  required: "Owner name is required",
                })}
                placeholder="Enter owner name"
                className="h-9 w-full rounded-md border border-border bg-background px-3 text-xs outline-none placeholder:text-secondary focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

              {errors.ownerName && (
                <p className="mt-1 text-[9px] text-red-500">
                  {errors.ownerName.message}
                </p>
              )}
            </div>

            {/* MOBILE */}
            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                Mobile Number <span className="ml-1 text-red-500">*</span>
              </label>

              <div className="relative">
                <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />

                <input
                  {...register("mobileNumber", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10 digit number",
                    },
                  })}
                  type="tel"
                  maxLength={10}
                  placeholder="9876543210"
                  className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-3 text-xs outline-none placeholder:text-secondary focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              {errors.mobileNumber && (
                <p className="mt-1 text-[9px] text-red-500">
                  {errors.mobileNumber.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                Email
              </label>

              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />

                <input
                  {...register("email", {
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  type="email"
                  placeholder="shop@example.com"
                  className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-3 text-xs outline-none placeholder:text-secondary focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              {errors.email && (
                <p className="mt-1 text-[9px] text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* BUSINESS INFORMATION */}
        <section className="overflow-hidden rounded-md border border-border bg-card">
          <div className="border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                <FileText size={14} />
              </div>

              <div>
                <h2 className="text-xs font-semibold">Business Information</h2>
                <p className="text-[9px] text-secondary">Tax and registration information.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-4 md:grid-cols-2">
            {/* GST */}
            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                GST Number <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                {...register("gstNumber", {
                  required: "GST number is required",
                })}
                placeholder="Enter GST number"
                className="h-9 w-full rounded-md border border-border bg-background px-3 text-xs uppercase outline-none placeholder:normal-case placeholder:text-secondary focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

              {errors.gstNumber && (
                <p className="mt-1 text-[9px] text-red-500">
                  {errors.gstNumber.message}
                </p>
              )}
            </div>

            {/* FSSAI */}
            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                FSSAI Number <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                {...register("fssaiNumber", {
                  required: "FSSAI number is required",
                })}
                placeholder="Enter FSSAI number"
                className="h-9 w-full rounded-md border border-border bg-background px-3 text-xs outline-none placeholder:text-secondary focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

              {errors.fssaiNumber && (
                <p className="mt-1 text-[9px] text-red-500">
                  {errors.fssaiNumber.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ADDRESS */}
        <section className="overflow-hidden rounded-md border border-border bg-card">
          <div className="border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                <MapPin size={14} />
              </div>

              <div>
                <h2 className="text-xs font-semibold">Shop Address</h2>
                <p className="text-[9px] text-secondary">Where your shop is located.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4">
            {/* ADDRESS */}
            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                Address <span className="ml-1 text-red-500">*</span>
              </label>

              <textarea
                {...register("address", {
                  required: "Address is required",
                })}
                placeholder="Enter complete shop address"
                rows={3}
                className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-xs outline-none placeholder:text-secondary focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

              {errors.address && (
                <p className="mt-1 text-[9px] text-red-500">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {/* CITY */}
              <div>
                <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                  City <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  {...register("city", {
                    required: "City is required",
                  })}
                  placeholder="Balasore"
                  className="h-9 w-full rounded-md border border-border bg-background px-3 text-xs outline-none placeholder:text-secondary focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

                {errors.city && (
                  <p className="mt-1 text-[9px] text-red-500">
                    {errors.city.message}
                  </p>
                )}
              </div>

              {/* STATE */}
              <div>
                <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                  State <span className="ml-1 text-red-500">*</span>
                </label>

                <select
                  {...register("state", {
                    required: "State is required",
                  })}
                  className="h-9 w-full rounded-md border border-border bg-background px-3 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  <option value="">Select state</option>
                  <option value="Odisha">Odisha</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Other">Other</option>
                </select>

                {errors.state && (
                  <p className="mt-1 text-[9px] text-red-500">
                    {errors.state.message}
                  </p>
                )}
              </div>

              {/* PIN */}
              <div>
                <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                  PIN Code <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  {...register("pinCode", {
                    required: "PIN code is required",
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: "Enter a valid 6 digit PIN",
                    },
                  })}
                  maxLength={6}
                  placeholder="756001"
                  className="h-9 w-full rounded-md border border-border bg-background px-3 text-xs outline-none placeholder:text-secondary focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

                {errors.pinCode && (
                  <p className="mt-1 text-[9px] text-red-500">
                    {errors.pinCode.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* LOGO */}
        <section className="overflow-hidden rounded-md border border-border bg-card">
          <div className="border-b border-border px-4 py-3">
            <h2 className="text-xs font-semibold">Shop Logo</h2>
            <p className="text-[9px] text-secondary">Add your shop logo for invoices and branding.</p>
          </div>

          <div className="p-4">
            <label className="flex min-h-[110px] cursor-pointer items-center justify-center rounded-md border border-dashed border-border bg-background transition-colors hover:bg-muted/40">
              {logoPreview ? (
                <img src={logoPreview} alt="Shop logo" className="h-24 w-24 rounded-md object-contain" />
              ) : (
                <div className="text-center">
                  <Upload size={20} className="mx-auto text-secondary" />
                  <p className="mt-2 text-xs font-medium">Upload Shop Logo</p>
                  <p className="mt-1 text-[9px] text-secondary">PNG, JPG up to 2MB</p>
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

        {/* ACTIONS */}
        <div className="flex flex-col-reverse items-stretch justify-end gap-2 rounded-md border border-border bg-card px-4 py-3 sm:flex-row sm:items-center">
          <button type="button" onClick={() => navigate(-1)} className="h-9 rounded-md border border-border px-4 text-xs font-medium text-secondary transition-colors hover:bg-muted hover:text-foreground">
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={14} />
            {loading ? "Creating..." : "Create Shop"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateShop;