import React from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";

const AdminHeader = () => {
  const location = useLocation();

  const pageTitles = {
    "/admin": "Dashboard",
    "/admin/users": "Users",
    "/admin/shops": "Shops",
    "/admin/subscriptions": "Subscriptions",
    "/admin/settings": "Settings",
  };

  const title = pageTitles[location.pathname] || "Admin Panel";

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-5">

      {/* Left */}
      <div>
        <h1 className="text-base font-semibold text-foreground">
          {title}
        </h1>

        <p className="text-xs text-foreground-muted">
          Manage your billing platform
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        {/* Search */}
        <button
          className="
            flex h-9 w-9 items-center justify-center
            rounded-lg
            text-foreground-muted
            transition
            hover:bg-secondary
            hover:text-foreground
          "
          title="Search"
        >
          <Search size={18} />
        </button>

        {/* Notifications */}
        <button
          className="
            relative
            flex h-9 w-9 items-center justify-center
            rounded-lg
            text-foreground-muted
            transition
            hover:bg-secondary
            hover:text-foreground
          "
          title="Notifications"
        >
          <Bell size={18} />

          {/* Notification dot */}
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </button>

        {/* Admin Profile */}
        <button
          className="
            flex items-center gap-2
            rounded-lg
            px-2 py-1.5
            transition
            hover:bg-secondary
          "
        >
          <div
            className="
              flex h-8 w-8 items-center justify-center
              rounded-full
              bg-primary/10
              text-sm
            "
          >
            🛡️
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold text-foreground">
              Admin
            </p>

            <p className="text-[10px] text-foreground-muted">
              Administrator
            </p>
          </div>

          <ChevronDown
            size={14}
            className="text-foreground-muted"
          />
        </button>

      </div>
    </header>
  );
};

export default AdminHeader;