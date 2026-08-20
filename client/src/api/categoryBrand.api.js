import api from "./axios";

//create brand
export const createBrand = (data) => {
  return api.post("/shop/brands", data);
};
export const getBrands = () => {
  return api.get("/shop/brands");
};
