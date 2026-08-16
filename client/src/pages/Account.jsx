import React from "react";
import { useAuth } from "../context/AuthContext";

const Account = () => {
  const { user } = useAuth();

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-base font-semibold text-foreground sm:text-lg">
          General
        </h2>

        <p className="mt-1 text-xs leading-5 text-secondary sm:text-sm">
          Manage your basic account information.
        </p>
      </div>

      <div className="space-y-5 sm:space-y-6">
        {/* USERNAME */}
        <div className="min-w-0">
          <label className="mb-2 block text-xs font-medium text-foreground sm:text-sm">
            Username
          </label>

          <div className="flex min-h-11 w-full min-w-0 items-center overflow-hidden rounded-md border border-secondary/20 bg-card px-3 sm:px-4">
            <span className="w-full truncate text-xs text-foreground sm:text-sm">
              {user?.name || "Not available"}
            </span>
          </div>

          <p className="mt-2 text-[10px] leading-4 text-secondary sm:text-xs">
            Your username is used to identify your account.
          </p>
        </div>

        {/* EMAIL */}
        <div className="min-w-0">
          <label className="mb-2 block text-xs font-medium text-foreground sm:text-sm">
            Account Email
          </label>

          <div className="flex min-h-11 w-full min-w-0 items-center overflow-hidden rounded-md border border-secondary/20 bg-card px-3 sm:px-4">
            <span className="w-full truncate text-xs text-foreground sm:text-sm">
              {user?.email || "Not available"}
            </span>
          </div>

          <p className="mt-2 text-[10px] leading-4 text-secondary sm:text-xs">
            Your account email is used for login and important account
            notifications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Account;