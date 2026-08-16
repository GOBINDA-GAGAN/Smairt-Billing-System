import React, { useState } from "react";
import {
  Search,
  Bell,
  Moon,
  ChevronDown,
  LogOut,
  User,
  Store,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { routeTitles } from "../constants/routeTitles";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const title = routeTitles[location.pathname] || "Dashboard";

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
      setIsProfileOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // =====================================================
  // SHOP CHECK
  // =====================================================

  const hasShop = Boolean(user?.shopId);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background px-3 sm:px-6">
        {/* PAGE TITLE */}
        <h1 className="text-sm font-semibold text-foreground sm:text-base">
          {title}
        </h1>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* SEARCH */}
          <div className="relative hidden w-64 sm:block">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="text"
              placeholder="Search anything..."
              className="h-9 w-full rounded-md border border-border bg-secondary/40 pl-9 pr-3 text-xs text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* NOTIFICATION */}
          <button
            type="button"
            className="relative rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Bell size={17} />

            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
          </button>

          {/* DARK MODE */}
          <button
            type="button"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Moon size={17} />
          </button>

          {/* PROFILE */}
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-md px-1.5 py-1.5 transition-colors hover:bg-secondary sm:px-2"
          >
            {/* AVATAR */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-primary/10 text-primary">
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user?.name || "User"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={15} />
              )}
            </div>

            {/* USER INFO */}
            <div className="hidden text-left sm:block">
              <p className="max-w-[120px] truncate text-xs font-semibold text-foreground">
                {user?.name || "Shopkeeper"}
              </p>

              <p className="max-w-[120px] truncate text-[9px] text-muted-foreground">
                {hasShop ? "Shop Owner" : "Create your shop"}
              </p>
            </div>

            {/* ARROW */}
            <ChevronDown
              size={14}
              className={`text-muted-foreground transition-transform duration-150 ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* =====================================================
          PROFILE MODAL
      ===================================================== */}

      {isProfileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/20"
          onClick={() => setIsProfileOpen(false)}
        >
          <div
            className="absolute right-2 top-16 w-[calc(100%-1rem)] max-w-64 overflow-hidden rounded-md border border-border bg-card shadow-xl sm:right-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* USER INFO */}
            <div className="border-b border-border p-3">
              <div className="flex items-center gap-2.5">
                {/* AVATAR */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-primary/10 text-primary">
                  {user?.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt={user?.name || "User"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User size={17} />
                  )}
                </div>

                {/* USER DETAILS */}
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-foreground">
                    {user?.name || "Shopkeeper"}
                  </p>

                  <p className="truncate text-[9px] text-secondary">
                    {user?.email || ""}
                  </p>
                </div>
              </div>
            </div>

            {/* MENU */}
            <div className="p-1.5">
              {/* PROFILE */}
              <button
                type="button"
                onClick={() => {
                  navigate("/account");
                  setIsProfileOpen(false);
                }}
                className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors hover:bg-muted"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <User size={15} />
                </div>

                <div>
                  <p className="text-xs font-medium text-foreground">
                    Profile
                  </p>

                  <p className="text-[9px] text-secondary">
                    Manage your account
                  </p>
                </div>
              </button>

              {/* SHOP */}
              {hasShop ? (
                <button
                  type="button"
                  onClick={() => {
                    navigate("/account/shop");
                    setIsProfileOpen(false);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors hover:bg-muted"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Store size={15} />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-foreground">
                      Your Shop
                    </p>

                    <p className="text-[9px] text-secondary">
                      Manage your shop
                    </p>
                  </div>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    navigate("/shop/create");
                    setIsProfileOpen(false);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors hover:bg-primary/5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Store size={15} />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-foreground">
                      Create a Shop
                    </p>

                    <p className="text-[9px] text-secondary">
                      Set up your business
                    </p>
                  </div>
                </button>
              )}

              {/* DIVIDER */}
              <div className="my-1 border-t border-border" />

              {/* LOGOUT */}
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-red-500 transition-colors hover:bg-red-500/10"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-500/10">
                  <LogOut size={15} />
                </div>

                <div>
                  <p className="text-xs font-medium">Logout</p>

                  <p className="text-[9px] text-red-400/70">
                    Sign out of your account
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;