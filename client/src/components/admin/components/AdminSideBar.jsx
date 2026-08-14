import React from "react";
import {
  LayoutDashboard,
  Users,
  Store,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";


const AdminSideBar = () => {
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
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-background">

      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground">
            ₹
          </div>

          <div>
            <h1 className="text-sm font-bold text-foreground">
              Smart Billing
            </h1>

            <p className="text-[10px] text-foreground-muted">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">

        <p className="mb-3 px-3 pt-2 text-[10px] font-semibold uppercase tracking-wider text-foreground-muted">
          Management
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                rounded-lg
                px-3 py-2.5
                text-sm
                transition
                ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground-secondary hover:bg-secondary hover:text-foreground"
                }
                `
              }
            >
              <Icon size={18} />

              <span>{item.label}</span>
            </NavLink>
          );
        })}

      </nav>

      {/* Bottom */}
      <div className="border-t border-border p-3">
        <button
          onClick={handleLogout}
          className="
            flex w-full items-center gap-3
            rounded-lg
            px-3 py-2.5
            text-sm
            text-red-500
            transition
            hover:bg-red-500/10
          "
        >
          <LogOut size={18} />

          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
};

export default AdminSideBar;