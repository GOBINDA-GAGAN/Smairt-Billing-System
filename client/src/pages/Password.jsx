import React, { useState } from "react";
import { Lock, Eye, EyeOff, Save } from "lucide-react";

const Password = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="max-w-2xl">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground">
          Password
        </h1>

        <p className="mt-1 text-sm text-secondary">
          Update your account password
        </p>
      </div>

      <div className="space-y-6">

        {/* Current Password */}
        <PasswordInput
          label="Current Password"
          placeholder="Enter current password"
          show={showCurrent}
          setShow={setShowCurrent}
        />

        {/* New Password */}
        <PasswordInput
          label="New Password"
          placeholder="Enter new password"
          show={showNew}
          setShow={setShowNew}
        />

        {/* Confirm Password */}
        <PasswordInput
          label="Confirm New Password"
          placeholder="Confirm new password"
          show={showConfirm}
          setShow={setShowConfirm}
        />

        {/* Password Requirements */}
        <div className="rounded-md border border-secondary/20 bg-card p-4">
          <p className="text-xs font-medium text-foreground">
            Password requirements
          </p>

          <ul className="mt-2 space-y-1 text-xs text-secondary">
            <li>• At least 6 characters</li>
            <li>• Use a combination of letters and numbers</li>
            <li>• Avoid using an easily guessed password</li>
          </ul>
        </div>

        {/* Save */}
        <div className="flex justify-end border-t border-secondary/20 pt-6">
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
            Update Password
          </button>
        </div>

      </div>
    </div>
  );
};

const PasswordInput = ({
  label,
  placeholder,
  show,
  setShow,
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">
        {label}
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
        <Lock
          size={17}
          className="shrink-0 text-secondary"
        />

        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="
            w-full
            bg-transparent
            text-sm text-foreground
            outline-none
            placeholder:text-foreground
          "
        />

        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="
            shrink-0
            text-secondary
            transition
            hover:text-foreground
          "
        >
          {show ? (
            <EyeOff size={17} />
          ) : (
            <Eye size={17} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Password;