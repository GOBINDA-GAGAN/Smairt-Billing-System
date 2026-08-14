import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/admin/components/AdminSideBar";
import AdminHeader from "../components/admin/components/AdminHeader";


const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-background">

      <AdminSideBar />

      <div className="flex min-w-0 flex-1 flex-col">

        <AdminHeader />

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;