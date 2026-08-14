import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="ml-64">
        <Header />

        <main className="min-h-[calc(100vh-56px)] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;