import api from "./axios";

// Create shop
export const createShop = (data) => {
  return api.post("/shop", data);
};

// Get shop
export const getShopApi = () => {
  return api.get("/shop");
};