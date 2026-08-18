import React, { useState } from "react";
import {
  LayoutDashboard,
  Receipt,
  Users,
  Package,
  Plus,
  Tag,
  BarChart3,
  CreditCard,
  CircleDollarSign,
  Wallet,
  Settings,
  MoreHorizontal,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const MobileBottomNav = () => {
  const [showMore, setShowMore] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "New Bill",
      path: "/new-bill",
      icon: Plus,
    },
    {
      name: "All Bills",
      path: "/all-bills",
      icon: Receipt,
    },
    {
      name: "Customers",
      path: "/customers",
      icon: Users,
    },
    {
      name: "Category & Brands",
      path: "/categorys&brands",
      icon: Tag,
    },
    {
      name: "Products",
      path: "/products",
      icon: Package,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: BarChart3,
    },
    {
      name: "Payments",
      path: "/payments",
      icon: CreditCard,
    },
    {
      name: "Due Payments",
      path: "/due-payments",
      icon: CircleDollarSign,
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: Wallet,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  const visibleItems = menuItems.slice(0, 4);
  const moreItems = menuItems.slice(4);

  return (
    <>
      {/* MORE MENU */}

      {showMore && (
        <div
          className="fixed inset-0 z-40 bg-black/10 md:hidden"
          onClick={() => setShowMore(false)}
        />
      )}

      {showMore && (
        <div className="fixed bottom-[68px] right-2 z-50 w-52 overflow-hidden rounded-xl border border-border bg-card p-2 shadow-xl md:hidden">

          <div className="mb-1 flex items-center justify-between px-2 py-1">

            <span className="text-xs font-semibold text-foreground">
              More
            </span>

            <button
              onClick={() => setShowMore(false)}
              className="rounded-md p-1 text-muted-foreground hover:bg-muted"
            >
              <X size={14} />
            </button>

          </div>

          <div className="grid grid-cols-2 gap-1">

            {moreItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setShowMore(false)}
                  className="min-w-0"
                >
                  {({ isActive }) => (
                    <div
                      className={`flex h-16 flex-col items-center justify-center gap-1 rounded-lg px-1 transition ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-secondary hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Icon
                        size={18}
                        strokeWidth={isActive ? 2.5 : 2}
                      />

                      <span
                        className={`w-full truncate text-center text-[9px] ${
                          isActive
                            ? "font-semibold"
                            : "font-medium"
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                  )}
                </NavLink>
              );
            })}

          </div>
        </div>
      )}

      {/* BOTTOM NAV */}

      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center border-t border-border bg-card/95 px-1.5 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      >

        {/* FIRST 4 */}

        {visibleItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex h-full min-w-0 flex-1 items-center justify-center"
            >
              {({ isActive }) => (
                <div
                  className={`flex h-full w-full max-w-22.5 flex-col items-center justify-center gap-0.5 rounded-md transition-all duration-200 ${
                    isActive
                      ? "text-primary"
                      : "text-secondary hover:text-foreground"
                  }`}
                >
                  <div
                    className={`flex h-7 w-10 items-center justify-center rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-primary/10"
                        : "bg-transparent"
                    }`}
                  >
                    <Icon
                      size={19}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </div>

                  <span
                    className={`max-w-full truncate text-[9px] leading-3 ${
                      isActive
                        ? "font-semibold"
                        : "font-medium"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              )}
            </NavLink>
          );
        })}

        {/* MORE */}

        <button
          onClick={() => setShowMore((prev) => !prev)}
          className={`flex h-full min-w-0 flex-1 items-center justify-center ${
            showMore
              ? "text-primary"
              : "text-secondary"
          }`}
        >
          <div className="flex h-full w-full max-w-22.5 flex-col items-center justify-center gap-0.5">

            <div
              className={`flex h-7 w-10 items-center justify-center rounded-full ${
                showMore
                  ? "bg-primary/10"
                  : "bg-transparent"
              }`}
            >
              <MoreHorizontal
                size={19}
                strokeWidth={showMore ? 2.5 : 2}
              />
            </div>

            <span
              className={`text-[9px] leading-3 ${
                showMore
                  ? "font-semibold"
                  : "font-medium"
              }`}
            >
              More
            </span>

          </div>
        </button>

      </nav>
    </>
  );
};

export default MobileBottomNav;