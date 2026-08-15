import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/admin/components/AdminSideBar";
import AdminHeader from "../components/admin/components/AdminHeader";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminSideBar
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
        <AdminHeader />

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

export default AdminLayout;