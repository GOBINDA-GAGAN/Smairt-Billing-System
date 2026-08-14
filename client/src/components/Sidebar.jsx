import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Plus,
  Receipt,
  Users,
  Package,
  BarChart3,
  CreditCard,
  CircleDollarSign,
  Wallet,
  Settings,
  Crown,
  Menu,
} from "lucide-react";

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
    name: "Bills",
    path: "/bills",
    icon: Receipt,
  },
  {
    name: "Customers",
    path: "/customers",
    icon: Users,
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

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-border bg-card px-4 py-5">
      {/* Logo */}
      <div className="flex items-center justify-between px-2">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Wallet size={19} strokeWidth={2.5} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              ShopBill
            </h1>

            <p className="text-[9px] font-medium text-muted-foreground">
              Smart Billing for Smart Shops
            </p>
          </div>
        </Link>

        <button className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-foreground">
          <Menu size={17} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-7 flex-1 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            location.pathname === item.path ||
            (item.path !== "/" &&
              location.pathname.startsWith(`${item.path}/`));

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`
          group relative flex items-center gap-3
          rounded-md px-3 py-2.5
          text-sm font-medium
          transition-all duration-200

          ${
            isActive
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }
        `}
            >
              <Icon
                size={18}
                strokeWidth={isActive ? 2.3 : 1.8}
                className={`
            shrink-0 transition-all duration-200
            ${
              isActive
                ? "text-primary-foreground"
                : "text-muted-foreground group-hover:text-primary"
            }
          `}
              />

              <span className="flex-1">{item.name}</span>

              {isActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <Link
        to="/profile"
        className="flex items-center gap-3 rounded-xl border border-border bg-secondary/50 p-3 transition hover:bg-secondary"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm">
          👨🏻‍💼
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-foreground">
            Shopkeeper
          </p>

          <p className="truncate text-[10px] text-muted-foreground">
            shopkeeper@gmail.com
          </p>
        </div>

        <span className="text-xs text-muted-foreground">⌄</span>
      </Link>
    </aside>
  );
};

export default Sidebar;
