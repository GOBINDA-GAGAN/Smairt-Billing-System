import express from "express";
import {
  createBrand,
  createCategory,
  deleteBrand,
  deleteCategory,
  getBrand,
  getBrands,
  getCategories,
  getCategory,
  updateBrand,
  updateCategory,
} from "../controller/brandCategory.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const brandCategoryrouter = express.Router();

/* =========================
   BRAND ROUTES
========================= */

brandCategoryrouter.post("/brands",authenticate, createBrand);

brandCategoryrouter.get("/brands",authenticate, getBrands);

brandCategoryrouter.get("/brands/:id",authenticate, getBrand);

brandCategoryrouter.put("/brands/:id",authenticate, updateBrand);

brandCategoryrouter.delete("/brands/:id",authenticate, deleteBrand);

/* =========================
   CATEGORY ROUTES
========================= */

// Routes
brandCategoryrouter.post("/categories", authenticate, createCategory);

brandCategoryrouter.get("/categories", authenticate, getCategories);

brandCategoryrouter.get("/categories/:id", authenticate, getCategory);

brandCategoryrouter.put("/categories/:id", authenticate, updateCategory);

brandCategoryrouter.delete("/categories/:id", authenticate, deleteCategory);

export default brandCategoryrouter;
