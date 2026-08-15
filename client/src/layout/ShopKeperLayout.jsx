import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={`
          min-h-screen
          min-w-0
          transition-[margin]
          duration-300
          ease-in-out
          ${collapsed ? "ml-16" : "ml-64"}
        `}
      >
        <Header />

        <main
          className="
            min-h-[calc(100vh-56px)]
            min-w-0
            overflow-x-hidden
            p-6
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;