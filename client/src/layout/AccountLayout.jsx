import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { User, Pencil, Lock, Store, Settings } from "lucide-react";

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
    {
      label: "Setting",
      path: "/account/setting",
      icon: Settings,
    },
    {
      label: "Your Shop",
      path: "/account/shop",
      icon: Store,
    },
  ];

  return (
    <div className="min-h-full w-full min-w-0 bg-background">
      {/* HEADER */}
      <div className="mb-5 sm:mb-6 md:mb-8">
        <h1 className="text-lg font-semibold text-foreground sm:text-xl">
          Account
        </h1>

        <p className="mt-1 text-xs leading-4 text-secondary sm:text-sm">
          Manage your account and shop settings
        </p>
      </div>

      {/* CONTENT */}
      <div className="grid min-w-0 gap-5 md:gap-6 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-10">
        {/* SIDEBAR */}
        <aside className="min-w-0">
          <nav className="flex gap-1 overflow-x-auto rounded-lg border border-border bg-card p-1.5 lg:block lg:space-y-1 lg:border-0 lg:bg-transparent lg:p-0 lg:overflow-visible">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/account"}
                  title={item.label}
                  className={({ isActive }) =>
                    `flex min-w-max shrink-0 items-center justify-center gap-2 rounded-md px-3 py-2 text-xs transition sm:justify-start sm:text-sm lg:w-full ${
                      isActive
                        ? "bg-secondary/10 font-medium text-primary"
                        : "text-secondary hover:bg-secondary/5 hover:text-primary"
                    }`
                  }
                >
                  <Icon size={15} className="shrink-0" />

                  <span className="hidden sm:inline">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* PAGE */}
        <main className="min-w-0 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AccountLayout;
