import React from "react";
import {
  LayoutDashboard,
  Users,
  Store,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const AdminSideBar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      label: "Shops",
      path: "/admin/shops",
      icon: Store,
    },
    {
      label: "Subscriptions",
      path: "/admin/subscriptions",
      icon: CreditCard,
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

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
        bg-background
        transition-[width]
        duration-300
        ease-in-out
        ${collapsed ? "w-16" : "w-64"}
      `}
    >
      {/* =====================================================
          LOGO
      ===================================================== */}

      <div
        className={`
          flex
          h-16
          items-center
          border-b
          border-border
          ${collapsed ? "justify-center px-2" : "justify-between px-4"}
        `}
      >
        {/* Logo */}

        <div
          className={`
            flex
            items-center
            overflow-hidden
            transition-all
            duration-200
            ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
          `}
        >
          <div className="flex shrink-0 items-center gap-3">
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
                font-bold
                text-primary-foreground
              "
            >
              ₹
            </div>

            <div className="whitespace-nowrap">
              <h1 className="text-sm font-bold text-foreground">
                Smart Billing
              </h1>

              <p className="text-[10px] text-muted-foreground">
                Admin Panel
              </p>
            </div>
          </div>
        </div>

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

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav className="flex-1 space-y-1 p-3">
        {/* Section Title */}

        {!collapsed && (
          <p
            className="
              mb-3
              px-3
              pt-2
              text-[10px]
              font-semibold
              uppercase
              tracking-wider
              text-muted-foreground
            "
          >
            Management
          </p>
        )}

        {/* Menu */}

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              title={
                collapsed
                  ? item.label
                  : undefined
              }
              className={({ isActive }) =>
                `
                  group
                  flex
                  h-10
                  items-center
                  rounded-md
                  text-sm
                  transition-all
                  duration-200

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
                `
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={18}
                    strokeWidth={
                      isActive ? 2.2 : 1.8
                    }
                    className="
                      shrink-0
                      transition-colors
                      duration-200
                    "
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
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* =====================================================
          LOGOUT
      ===================================================== */}

      <div className="border-t border-border p-3">
        <button
          type="button"
          onClick={handleLogout}
          title={
            collapsed
              ? "Logout"
              : undefined
          }
          className={`
            flex
            h-10
            w-full
            items-center
            rounded-md
            text-sm
            text-red-500
            transition-all
            duration-200
            hover:bg-red-500/10

            ${
              collapsed
                ? "justify-center px-0"
                : "gap-3 px-3"
            }
          `}
        >
          <LogOut
            size={18}
            className="shrink-0"
          />

          <span
            className={`
              overflow-hidden
              whitespace-nowrap
              transition-all
              duration-200
              ${
                collapsed
                  ? "w-0 opacity-0"
                  : "w-auto opacity-100"
              }
            `}
          >
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSideBar;