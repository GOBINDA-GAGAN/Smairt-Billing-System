import api from "./axios";

// Register
export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

// Login
export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

// Get current logged-in user
export const getCurrentUser = () => {
  return api.get("/auth/me");
};

// Logout
export const logoutUser = () => {
  return api.post("/auth/logout");
};