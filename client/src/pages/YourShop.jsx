import React from "react";
import {
  Store,
  Phone,
  MapPin,
  Mail,
  FileText,
  Save,
} from "lucide-react";

const YourShop = () => {
  return (
    <div className="max-w-2xl">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground">
          Your Shop
        </h1>

        <p className="mt-1 text-sm text-secondary">
          Manage your shop information and billing details
        </p>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-secondary/20 bg-card p-6">
        <div className="space-y-6">

          {/* Shop Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Shop Name
            </label>

            <div className="
              flex h-11 items-center gap-3
              rounded-md
              border border-secondary/20
              bg-background
              px-3.5
              transition
              focus-within:border-primary/50
              focus-within:ring-2
              focus-within:ring-primary/10
            ">
              <Store
                size={17}
                className="shrink-0 text-secondary"
              />

              <input
                type="text"
                defaultValue="Alok General Store"
                className="
                  w-full
                  bg-transparent
                  text-sm text-foreground
                  outline-none
                  placeholder:text-secondary
                "
                placeholder="Enter shop name"
              />
            </div>

            <p className="mt-2 text-xs text-secondary">
              This name will appear on your bills and invoices.
            </p>
          </div>

          {/* Mobile + Email */}
          <div className="grid gap-6 md:grid-cols-2">

            {/* Mobile */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Mobile Number
              </label>

              <div className="
                flex h-11 items-center gap-3
                rounded-md
                border border-secondary/20
                bg-background
                px-3.5
                transition
                focus-within:border-primary/50
                focus-within:ring-2
                focus-within:ring-primary/10
              ">
                <Phone
                  size={17}
                  className="shrink-0 text-secondary"
                />

                <input
                  type="tel"
                  defaultValue="9876543210"
                  className="
                    w-full
                    bg-transparent
                    text-sm text-foreground
                    outline-none
                  "
                  placeholder="Enter mobile number"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Shop Email
              </label>

              <div className="
                flex h-11 items-center gap-3
                rounded-md
                border border-secondary/20
                bg-background
                px-3.5
                transition
                focus-within:border-primary/50
                focus-within:ring-2
                focus-within:ring-primary/10
              ">
                <Mail
                  size={17}
                  className="shrink-0 text-secondary"
                />

                <input
                  type="email"
                  defaultValue="alokstore@example.com"
                  className="
                    w-full
                    bg-transparent
                    text-sm text-foreground
                    outline-none
                  "
                  placeholder="Enter shop email"
                />
              </div>
            </div>

          </div>

          {/* Address */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Shop Address
            </label>

            <div className="
              flex items-start gap-3
              rounded-md
              border border-secondary/20
              bg-background
              px-3.5 py-3
              transition
              focus-within:border-primary/50
              focus-within:ring-2
              focus-within:ring-primary/10
            ">
              <MapPin
                size={17}
                className="mt-0.5 shrink-0 text-secondary"
              />

              <textarea
                rows={3}
                defaultValue="Main Road, Balasore, Odisha, India"
                className="
                  w-full
                  resize-none
                  bg-transparent
                  text-sm text-foreground
                  outline-none
                  placeholder:text-secondary
                "
                placeholder="Enter shop address"
              />
            </div>
          </div>

          {/* GST */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              GST Number
            </label>

            <div className="
              flex h-11 items-center gap-3
              rounded-md
              border border-secondary/20
              bg-background
              px-3.5
              transition
              focus-within:border-primary/50
              focus-within:ring-2
              focus-within:ring-primary/10
            ">
              <FileText
                size={17}
                className="shrink-0 text-secondary"
              />

              <input
                type="text"
                defaultValue="21ABCDE1234F1Z5"
                placeholder="Enter GST number"
                className="
                  w-full
                  bg-transparent
                  text-sm
                  uppercase
                  text-foreground
                  outline-none
                  placeholder:normal-case
                  placeholder:text-secondary
                "
              />
            </div>

            <p className="mt-2 text-xs text-secondary">
              GST information will be printed on applicable invoices.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="
          mt-7
          flex items-center justify-end
          border-t border-secondary/20
          pt-5
        ">
          <button
            type="button"
            className="
              flex h-10 items-center gap-2
              rounded-md
              bg-primary
              px-4
              text-sm font-medium
              text-primary-foreground
              shadow-sm
              transition
              hover:opacity-90
              active:scale-[0.98]
            "
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default YourShop;