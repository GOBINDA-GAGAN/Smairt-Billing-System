import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  User,
  Pencil,
  Lock,
  CreditCard,
  Bell,
  Store,
} from "lucide-react";

const AccountLayout = () => {
  const menuItems = [
    {
      label: "General",
      path: "/account",
      icon: User,
    },
    {
      label: "Edit Profile",
      path: "/account/profile",
      icon: Pencil,
    },
    {
      label: "Password",
      path: "/account/password",
      icon: Lock,
    },
    // {
    //   label: "Billing",
    //   path: "/account/billing",
    //   icon: CreditCard,
    // },
    {
      label: "Notifications",
      path: "/account/notifications",
      icon: Bell,
    },
    {
      label: "Your Shop",
      path: "/account/shop",
      icon: Store,
    },
  ];

  return (
    <div className="min-h-full bg-background">

      {/* Account Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground">
          Account
        </h1>

        <p className="mt-1 text-sm text-secondary">
          Manage your account and shop settings
        </p>
      </div>

      {/* Settings */}
      <div className="grid gap-10 lg:grid-cols-[180px_minmax(0,1fr)]">

        {/* Sidebar */}
        <aside>
          <nav className="space-y-1">

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/account"}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-2
                    rounded-md
                    px-2 py-2
                    text-sm
                    transition
                    ${
                      isActive
                        ? "bg-secondary/10 font-medium text-primary"
                        : "text-secondary hover:bg-secondary/5 hover:text-primary"
                    }
                    `
                  }
                >
                  <Icon size={15} />

                  {item.label}
                </NavLink>
              );
            })}

          </nav>
        </aside>

        {/* Page */}
        <main className="min-w-0">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AccountLayout;