import React from "react";
import {
  LayoutDashboard,
  Receipt,
  Users,
  Package,
  MoreHorizontal,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const MobileBottomNav = () => {
  const menuItems = [
    {
      label: "Home",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      label: "Bills",
      icon: Receipt,
      path: "/bills",
    },
    {
      label: "Customers",
      icon: Users,
      path: "/customers",
    },
    {
      label: "Products",
      icon: Package,
      path: "/products",
    },
    {
      label: "More",
      icon: MoreHorizontal,
      path: "/more",
    },
  ];

  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50

        flex
        h-16
        w-full

        items-center
        border-t
        border-border

        bg-card/95
        px-1.5
        pb-[env(safe-area-inset-bottom)]
        backdrop-blur-md

        md:hidden
      "
    >
      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex h-full min-w-0 flex-1 items-center justify-center"
          >
            {({ isActive }) => (
              <div
                className={`
                  flex
                  h-full
                  w-full
                  max-w-[90px]
                  flex-col
                  items-center
                  justify-center
                  gap-0.5
                  rounded-md
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? "text-primary"
                      : "text-secondary hover:text-foreground"
                  }
                `}
              >
                {/* Icon */}
                <div
                  className={`
                    flex
                    h-7
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "bg-primary/10"
                        : "bg-transparent"
                    }
                  `}
                >
                  <Icon
                    size={19}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>

                {/* Label */}
                <span
                  className={`
                    max-w-full
                    truncate
                    text-[9px]
                    leading-3
                    ${
                      isActive
                        ? "font-semibold"
                        : "font-medium"
                    }
                  `}
                >
                  {item.label}
                </span>
              </div>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;