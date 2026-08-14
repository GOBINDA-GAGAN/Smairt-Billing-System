import React from "react";
import { User, Mail, Phone, Save } from "lucide-react";

const EditProfile = () => {
  return (
    <div className="min-h-full bg-background">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground">
          Edit Profile
        </h1>

        <p className="mt-1 text-sm text-secondary">
          Update your personal information
        </p>
      </div>

      {/* Profile */}
      <div className="max-w-2xl space-y-7">

        {/* Profile Picture */}
        <div className="flex items-center gap-4">

          <div
            className="
              flex h-16 w-16
              items-center justify-center
              rounded-full
              bg-primary/10
              text-2xl
            "
          >
            👨🏻‍💼
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">
              Profile Picture
            </p>

            <p className="mt-1 text-xs text-secondary">
              Your profile picture will be visible on your account.
            </p>

            <button
              type="button"
              className="
                mt-3
                rounded-md
                border border-secondary/20
                bg-card
                px-3 py-1.5
                text-xs font-medium
                text-foreground
                transition
                hover:bg-secondary/10
              "
            >
              Change Picture
            </button>
          </div>

        </div>

        {/* Full Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Full Name
          </label>

          <div
            className="
              flex h-11 items-center gap-3
              rounded-md
              border border-secondary/20
              bg-card
              px-3.5
              transition
              focus-within:border-primary/50
              focus-within:ring-2
              focus-within:ring-primary/10
            "
          >
            <User
              size={17}
              className="shrink-0 text-secondary"
            />

            <input
              type="text"
              defaultValue="Alok Dey"
              className="
                w-full
                bg-transparent
                text-sm text-foreground
                outline-none
                placeholder:text-secondary
              "
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Email Address
          </label>

          <div
            className="
              flex h-11 items-center gap-3
              rounded-md
              border border-secondary/20
              bg-card
              px-3.5
              transition
              focus-within:border-primary/50
              focus-within:ring-2
              focus-within:ring-primary/10
            "
          >
            <Mail
              size={17}
              className="shrink-0 text-secondary"
            />

            <input
              type="email"
              defaultValue="alok@example.com"
              className="
                w-full
                bg-transparent
                text-sm text-foreground
                outline-none
                placeholder:text-secondary
              "
            />
          </div>

          <p className="mt-2 text-xs text-secondary">
            This email address is used for your account.
          </p>
        </div>

        {/* Mobile */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Mobile Number
          </label>

          <div
            className="
              flex h-11 items-center gap-3
              rounded-md
              border border-secondary/20
              bg-card
              px-3.5
              transition
              focus-within:border-primary/50
              focus-within:ring-2
              focus-within:ring-primary/10
            "
          >
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
                placeholder:text-secondary
              "
            />
          </div>
        </div>

        {/* Save */}
        <div
          className="
            flex justify-end
            border-t border-secondary/20
            pt-6
          "
        >
          <button
            type="button"
            className="
              flex items-center gap-2
              rounded-md
              bg-primary
              px-5 py-2.5
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

export default EditProfile;