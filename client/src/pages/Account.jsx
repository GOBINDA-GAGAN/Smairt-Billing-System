import React from "react";

const Account = () => {
  return (
    <div className="max-w-2xl">

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground">
          General
        </h2>

        <p className="mt-1 text-sm text-secondary">
          Manage your basic account information.
        </p>
      </div>

      <div className="space-y-7">

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Username
          </label>

          <input
            type="text"
            defaultValue="AlokDey"
            className="
              h-11 w-full
              rounded-md
              border border-secondary/20
              bg-card
              px-4
              text-sm text-foreground
              outline-none
              transition
              focus:border-primary/50
              focus:ring-2
              focus:ring-primary/10
            "
          />

          <p className="mt-2 text-xs text-secondary">
            Your username is used to identify your account.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Account Email
          </label>

          <input
            type="email"
            defaultValue="alok@example.com"
            className="
              h-11 w-full
              rounded-md
              border border-secondary/20
              bg-card
              px-4
              text-sm text-foreground
              outline-none
              transition
              focus:border-primary/50
              focus:ring-2
              focus:ring-primary/10
            "
          />

          <p className="mt-2 text-xs text-secondary">
            This email is used for login and important account
            notifications.
          </p>
        </div>

        <div className="flex justify-end border-t border-secondary/20 pt-6">
          <button
            type="button"
            className="
              rounded-md
              bg-primary
              px-5 py-2.5
              text-sm font-medium
              text-primary-foreground
              transition
              hover:opacity-90
            "
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default Account;