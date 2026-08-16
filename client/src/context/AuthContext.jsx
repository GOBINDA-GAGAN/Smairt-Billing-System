import React, { createContext, useContext, useEffect, useState } from "react";

import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
} from "../api/auth.api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // IMPORTANT: true initially
  const [loading, setLoading] = useState(true);

  // Check existing login session
  const checkAuth = async () => {
    try {
      const response = await getCurrentUser();

      if (response.data.success) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Run when application starts
  useEffect(() => {
    checkAuth();
  }, []);

  // Login
const login = async (data) => {
     try {
      setLoading(true);

      const response = await loginUser(data);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

  const userData = response.data.user;

      setUser(userData);

      return userData;
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (data) => {
     try {
      setLoading(true);
      const response = await registerUser(data);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  // Get current user manually if needed
  const getUser = async () => {
    try {
      setLoading(true);

      const response = await getCurrentUser();

      if (response.data.success) {
        setUser(response.data.user);
      }

      return response.data;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setLoading(true);

      await logoutUser();

      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        getUser,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
