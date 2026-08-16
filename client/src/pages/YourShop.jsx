import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Store,
  Phone,
  MapPin,
  Mail,
  FileText,
  Save,
  Pencil,
  X,
  User,
  Building2,
  Hash,
} from "lucide-react";
import { useShop } from "../context/ShopContex";

const YourShop = () => {
  const { shop, getShop, loading } = useShop();

  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loadShop = async () => {
      try {
        const data = await getShop();
        reset(data);
      } catch (error) {
        console.error("Failed to load shopfff:", error.message);
      }
    };

    if (!shop) {
      loadShop();
    } else {
      reset(shop);
    }
  }, [shop, getShop, reset]);

  const handleEdit = () => {
    reset(shop);
    setIsEditing(true);
  };

  const handleCancel = () => {
    reset(shop);
    setIsEditing(false);
  };

  const onSubmit = (data) => {
    console.log("Shop Data:", data);
  };

  const fields = [
    { name: "name", label: "Shop Name", icon: Store },
    { name: "type", label: "Shop Type", icon: Building2 },
    { name: "ownerName", label: "Owner Name", icon: User },
    { name: "mobileNumber", label: "Mobile Number", icon: Phone },
    { name: "email", label: "Shop Email", icon: Mail },
    { name: "gstNumber", label: "GST Number", icon: FileText },
    { name: "fssaiNumber", label: "FSSAI Number", icon: FileText },
    { name: "city", label: "City", icon: MapPin },
    { name: "state", label: "State", icon: MapPin },
    { name: "pinCode", label: "PIN Code", icon: Hash },
  ];

  if (loading && !shop) {
    return (
      <div className="flex min-h-[240px] w-full items-center justify-center px-3 text-xs text-secondary sm:min-h-[300px] sm:text-sm">
        Loading shop...
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="w-full rounded-lg border border-border bg-card p-4 text-xs text-secondary sm:p-6 sm:text-sm">
        Shop not found.
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 max-w-4xl">
      {/* HEADER */}
      <div className="mb-5 flex min-w-0 flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-lg font-semibold text-foreground sm:text-xl">
            Your Shop
          </h1>

          <p className="mt-1 text-[10px] leading-4 text-secondary sm:text-xs">
            Manage your shop information and billing details
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={handleEdit}
            className="flex h-9 w-full shrink-0 items-center justify-center gap-2 rounded-md border border-border bg-card px-3 text-xs font-medium text-foreground transition hover:bg-muted sm:w-auto sm:px-4"
          >
            <Pencil size={14} />
            Edit Shop
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="min-w-0 overflow-hidden rounded-lg border border-border bg-card sm:rounded-xl">
          {/* SHOP HEADER */}
          <div className="border-b border-border p-3 sm:p-4 md:p-6">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:h-14 sm:w-14 sm:rounded-xl">
                <Store size={21} className="sm:h-[26px] sm:w-[26px]" />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="truncate text-sm font-semibold text-foreground sm:text-base md:text-lg">
                  {shop.name}
                </h2>

                <p className="mt-1 truncate text-[10px] text-secondary sm:text-xs">
                  {shop.type} • {shop.city}, {shop.state}
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-green-500/10 px-2 py-1 text-[9px] font-medium text-green-500 sm:px-2.5 sm:text-[10px]">
                Active
              </span>
            </div>
          </div>

          {/* SHOP INFORMATION */}
          <div className="p-3 sm:p-4 md:p-6">
            <div className="mb-4 sm:mb-5">
              <h3 className="text-xs font-semibold text-foreground sm:text-sm">
                Shop Information
              </h3>

              <p className="mt-1 text-[9px] leading-4 text-secondary sm:text-[10px]">
                Basic information about your business.
              </p>
            </div>

            {/* FIELDS */}
            <div className="grid min-w-0 gap-3 sm:grid-cols-2 sm:gap-4">
              {fields.map(({ name, label, icon: Icon }) => (
                <div key={name} className="min-w-0">
                  <label className="mb-1.5 block text-[9px] font-medium text-secondary sm:text-[10px]">
                    {label}
                  </label>

                  {isEditing ? (
                    <div className="flex h-10 min-w-0 items-center gap-2 rounded-md border border-border bg-background px-2.5 transition focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/10 sm:px-3">
                      <Icon
                        size={14}
                        className="shrink-0 text-secondary sm:h-[15px] sm:w-[15px]"
                      />

                      <input
                        {...register(name, {
                          required: `${label} is required`,
                        })}
                        className="min-w-0 w-full bg-transparent text-[11px] text-foreground outline-none placeholder:text-secondary sm:text-xs"
                      />
                    </div>
                  ) : (
                    <div className="flex min-h-10 min-w-0 items-center gap-2 overflow-hidden rounded-md border border-border/60 bg-background/50 px-2.5 sm:px-3">
                      <Icon
                        size={14}
                        className="shrink-0 text-secondary sm:h-[15px] sm:w-[15px]"
                      />

                      <span className="min-w-0 truncate text-[11px] text-foreground sm:text-xs">
                        {shop[name] || "Not provided"}
                      </span>
                    </div>
                  )}

                  {isEditing && errors[name] && (
                    <p className="mt-1 text-[9px] leading-3 text-red-500">
                      {errors[name].message}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* ADDRESS */}
            <div className="mt-3 min-w-0 sm:mt-4">
              <label className="mb-1.5 block text-[9px] font-medium text-secondary sm:text-[10px]">
                Shop Address
              </label>

              {isEditing ? (
                <div className="flex min-w-0 items-start gap-2 rounded-md border border-border bg-background px-2.5 py-2.5 transition focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/10 sm:px-3">
                  <MapPin
                    size={14}
                    className="mt-0.5 shrink-0 text-secondary sm:h-[15px] sm:w-[15px]"
                  />

                  <textarea
                    {...register("address", {
                      required: "Address is required",
                    })}
                    rows={3}
                    className="min-w-0 w-full resize-none bg-transparent text-[11px] text-foreground outline-none placeholder:text-secondary sm:text-xs"
                  />
                </div>
              ) : (
                <div className="flex min-w-0 items-start gap-2 overflow-hidden rounded-md border border-border/60 bg-background/50 px-2.5 py-2.5 sm:px-3">
                  <MapPin
                    size={14}
                    className="mt-0.5 shrink-0 text-secondary sm:h-[15px] sm:w-[15px]"
                  />

                  <p className="min-w-0 break-words text-[11px] leading-5 text-foreground sm:text-xs">
                    {shop.address || "Not provided"}
                  </p>
                </div>
              )}

              {isEditing && errors.address && (
                <p className="mt-1 text-[9px] leading-3 text-red-500">
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>

          {/* ACTIONS */}
          {isEditing && (
            <div className="flex flex-col-reverse gap-2 border-t border-border p-3 sm:flex-row sm:justify-end sm:p-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex h-9 w-full items-center justify-center gap-2 rounded-md border border-border px-4 text-xs font-medium text-secondary transition hover:bg-muted hover:text-foreground sm:w-auto"
              >
                <X size={14} />
                Cancel
              </button>

              <button
                type="submit"
                className="flex h-9 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground transition hover:opacity-90 sm:w-auto"
              >
                <Save size={14} />
                Save Changes
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default YourShop;