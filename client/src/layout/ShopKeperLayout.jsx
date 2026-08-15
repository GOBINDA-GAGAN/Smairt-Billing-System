import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MobileBottomNav from "../components/MobileBottomNav";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Desktop Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Area */}
      <div
        className={`
          min-h-screen
          min-w-0
          ml-0
          transition-[margin]
          duration-300
          ease-in-out
          ${collapsed ? "md:ml-16" : "md:ml-64"}
        `}
      >
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main
          className="
            min-h-[calc(100vh-56px)]
            w-full
            min-w-0
            overflow-x-hidden

            p-2.5
            pb-20

            sm:p-4
            sm:pb-20

            md:p-5
            md:pb-6

            lg:p-6
          "
        >
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default Layout;