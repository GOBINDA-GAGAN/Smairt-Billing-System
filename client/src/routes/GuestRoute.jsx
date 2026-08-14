import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GuestRoute = () => {
  const { user, loading } = useAuth();

  // Wait until /me finishes checking the session
  if (loading) {
    return null;
  }

  // Already logged in
  if (user) {
    if (user.role === "ADMIN") {
      return <Navigate to="/admin" replace />;
    }

    if (user.role === "SHOP_OWNER") {
      return <Navigate to="/" replace />;
    }
  }

  // Not logged in
  return <Outlet />;
};

export default GuestRoute;