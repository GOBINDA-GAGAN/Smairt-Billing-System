import React from "react";
import { Search, Bell, Moon, ChevronDown, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { routeTitles } from "../constants/routeTitles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const location = useLocation();
  const title = routeTitles[location.pathname] || "Dashboard";

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background px-6">
      {/* Page Title */}
      <h1 className="text-base font-semibold text-foreground">{title}</h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden w-64 sm:block">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <input
            type="text"
            placeholder="Search anything..."
            className="
              h-9 w-full rounded-lg
              border border-border
              bg-secondary/40
              pl-9 pr-3
              text-xs text-foreground
              outline-none
              placeholder:text-muted-foreground
              focus:border-primary
              focus:ring-2 focus:ring-primary/10
            "
          />
        </div>

        {/* Notification */}
        <button
          className="
            relative rounded-lg p-2
            text-muted-foreground
            transition
            hover:bg-secondary
            hover:text-foreground
          "
        >
          <Bell size={17} />

          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        {/* Dark Mode */}
        <button
          className="
            rounded-lg p-2
            text-muted-foreground
            transition
            hover:bg-secondary
            hover:text-foreground
          "
        >
          <Moon size={17} />
        </button>

        {/* User */}
        <div className="flex items-center gap-2">
          {/* Profile */}

          <Link to="/account">
            <button
              className="
      flex items-center gap-2
      rounded-lg px-2 py-1.5
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
                👨🏻‍💼
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-xs font-semibold text-foreground">
                  Shopkeeper
                </p>
              </div>

              <ChevronDown size={14} className="text-muted-foreground" />
            </button>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            title="Logout"
            className="
      flex h-9 w-9 items-center justify-center
      rounded-lg
      text-red-500
      transition
      hover:bg-red-500/10
    "
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
