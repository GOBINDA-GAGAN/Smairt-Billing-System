import api from "./axios";

// =====================================================
// BRAND
// =====================================================

// Create Brand
export const createBrand = (data) => {
  return api.post("/shop/brands", data);
};

// Get All Brands
export const getBrands = () => {
  return api.get("/shop/brands");
};

// Get Single Brand
export const getBrandById = (id) => {
  return api.get(`/shop/brands/${id}`);
};

// Update Brand
export const updateBrandById = (id, data) => {
  return api.put(`/shop/brands/${id}`, data);
};

// Delete Brand
export const deleteBrandById = (id) => {
  return api.delete(`/shop/brands/${id}`);
};

// =====================================================
// CATEGORY
// =====================================================

export const createCategory = (data) => {
  return api.post("/shop/categories", data);
};

export const getCategories = () => {
  return api.get("/shop/categories");
};

export const getCategoryById = (id) => {
  return api.get(`/shop/categories/${id}`);
};

export const updateCategoryById = (id, data) => {
  return api.put(`/shop/categories/${id}`, data);
};

export const deleteCategoryById = (id) => {
  return api.delete(`/shop/categories/${id}`);
};
