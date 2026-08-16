import React, { useState } from "react";
import { Lock, Eye, EyeOff, Save } from "lucide-react";

const Password = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="w-full min-w-0 max-w-2xl">
      {/* HEADER */}
      <div className="mb-5 sm:mb-6 md:mb-8">
        <h1 className="text-lg font-semibold text-foreground sm:text-xl">
          Password
        </h1>

        <p className="mt-1 text-xs leading-4 text-secondary sm:text-sm">
          Update your account password
        </p>
      </div>

      <div className="w-full space-y-5 sm:space-y-6">
        {/* CURRENT PASSWORD */}
        <PasswordInput
          label="Current Password"
          placeholder="Enter current password"
          show={showCurrent}
          setShow={setShowCurrent}
        />

        {/* NEW PASSWORD */}
        <PasswordInput
          label="New Password"
          placeholder="Enter new password"
          show={showNew}
          setShow={setShowNew}
        />

        {/* CONFIRM PASSWORD */}
        <PasswordInput
          label="Confirm New Password"
          placeholder="Confirm new password"
          show={showConfirm}
          setShow={setShowConfirm}
        />

        {/* REQUIREMENTS */}
        <div className="w-full rounded-md border border-secondary/20 bg-card p-3 sm:p-4">
          <p className="text-xs font-medium text-foreground sm:text-sm">
            Password requirements
          </p>

          <ul className="mt-2 space-y-1 text-[10px] leading-4 text-secondary sm:text-xs">
            <li>• At least 6 characters</li>
            <li>• Use a combination of letters and numbers</li>
            <li>• Avoid using an easily guessed password</li>
          </ul>
        </div>

        {/* UPDATE */}
        <div className="flex w-full flex-col gap-3 border-t border-secondary/20 pt-4 sm:flex-row sm:items-center sm:justify-end sm:pt-5 md:pt-6">
          <button
            type="button"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground shadow-sm transition hover:opacity-90 active:scale-[0.98] sm:w-auto sm:px-5 sm:text-sm"
          >
            <Save size={15} className="sm:h-4 sm:w-4" />
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
    <div className="w-full min-w-0">
      <label className="mb-1.5 block text-xs font-medium text-foreground sm:mb-2 sm:text-sm">
        {label}
      </label>

      <div className="flex h-10 w-full min-w-0 items-center gap-2 rounded-md border border-secondary/20 bg-card px-3 transition focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 sm:h-11 sm:gap-3 sm:px-3.5">
        <Lock
          size={16}
          className="shrink-0 text-secondary sm:h-[17px] sm:w-[17px]"
        />

        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-foreground/40 focus:placeholder:text-foreground/30 sm:text-sm"
        />

        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          aria-label={show ? "Hide password" : "Show password"}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-secondary transition hover:bg-secondary/10 hover:text-foreground"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
};

export default Password;