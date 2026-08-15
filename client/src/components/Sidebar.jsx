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
  ChevronRight,
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

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();

  return (
    <aside
      className={`
        fixed
        left-0
        top-0
        z-50
        flex
        h-screen
        flex-col
        border-r
        border-border
        bg-card
        px-3
        py-5
        transition-[width]
        duration-300
        ease-in-out
        ${collapsed ? "w-16" : "w-64"}
      `}
    >
      {/* Logo */}

      <div
        className={`
          flex
          items-center
          ${collapsed ? "justify-center" : "justify-between"}
        `}
      >
        {/* Logo */}

        <Link
          to="/"
          className={`
            flex
            items-center
            overflow-hidden
            transition-all
            duration-200
            ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
          `}
        >
          <div className="flex shrink-0 items-center gap-2 px-1">
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-md
                bg-primary
                text-primary-foreground
                shadow-sm
              "
            >
              <Wallet
                size={19}
                strokeWidth={2.5}
              />
            </div>

            <div className="whitespace-nowrap">
              <h1
                className="
                  text-lg
                  font-bold
                  tracking-tight
                  text-foreground
                "
              >
                ShopBill
              </h1>

              <p
                className="
                  text-[9px]
                  font-medium
                  text-muted-foreground
                "
              >
                Smart Billing for Smart Shops
              </p>
            </div>
          </div>
        </Link>

        {/* Collapse Button */}

        <button
          type="button"
          onClick={() =>
            setCollapsed((prev) => !prev)
          }
          title={
            collapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-md
            text-muted-foreground
            transition-colors
            duration-200
            hover:bg-secondary
            hover:text-foreground
          "
        >
          <ChevronRight
            size={17}
            className={`
              transition-transform
              duration-300
              ease-out
              ${collapsed ? "rotate-180" : ""}
            `}
          />
        </button>
      </div>

      {/* Navigation */}

      <nav className="mt-7 flex-1 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            location.pathname === item.path ||
            (item.path !== "/" &&
              location.pathname.startsWith(
                `${item.path}/`
              ));

          return (
            <Link
              key={item.name}
              to={item.path}
              title={
                collapsed
                  ? item.name
                  : undefined
              }
              className={`
                group
                flex
                h-10
                items-center
                rounded-md
                text-sm
                font-medium
                transition-all
                duration-200
                ease-out

                ${
                  collapsed
                    ? "justify-center px-0"
                    : "gap-3 px-3"
                }

                ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }
              `}
            >
              <Icon
                size={18}
                strokeWidth={
                  isActive ? 2.3 : 1.8
                }
                className={`
                  shrink-0
                  transition-colors
                  duration-200

                  ${
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground group-hover:text-primary"
                  }
                `}
              />

              <span
                className={`
                  overflow-hidden
                  whitespace-nowrap
                  transition-all
                  duration-200
                  ease-out

                  ${
                    collapsed
                      ? "w-0 opacity-0"
                      : "w-auto opacity-100"
                  }
                `}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Profile */}

      <Link
        to="/profile"
        title={
          collapsed
            ? "Profile"
            : undefined
        }
        className={`
          flex
          items-center
          rounded-md
          border
          border-border
          bg-secondary/50
          transition-all
          duration-200
          hover:bg-secondary

          ${
            collapsed
              ? "h-10 w-10 justify-center self-center p-0"
              : "gap-3 p-3"
          }
        `}
      >
        {/* Avatar */}

        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-md
            bg-primary/10
            text-sm
          "
        >
          👨🏻‍💼
        </div>

        {/* User */}

        <div
          className={`
            min-w-0
            flex-1
            overflow-hidden
            whitespace-nowrap
            transition-all
            duration-200
            ease-out

            ${
              collapsed
                ? "w-0 opacity-0"
                : "w-auto opacity-100"
            }
          `}
        >
          <p className="truncate text-xs font-semibold text-foreground">
            Shopkeeper
          </p>

          <p className="truncate text-[10px] text-muted-foreground">
            shopkeeper@gmail.com
          </p>
        </div>

        {!collapsed && (
          <span className="text-xs text-muted-foreground">
            ⌄
          </span>
        )}
      </Link>
    </aside>
  );
};

export default Sidebar;