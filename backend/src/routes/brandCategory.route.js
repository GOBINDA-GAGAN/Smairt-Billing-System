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

brandCategoryrouter.get("/brands", getBrands);

brandCategoryrouter.get("/brands/:id", getBrand);

brandCategoryrouter.put("/brands/:id", updateBrand);

brandCategoryrouter.delete("/brands/:id", deleteBrand);

/* =========================
   CATEGORY ROUTES
========================= */

brandCategoryrouter.post("/categories", createCategory);

brandCategoryrouter.get("/categories", getCategories);

brandCategoryrouter.get("/categories/:id", getCategory);

brandCategoryrouter.put("/categories/:id", updateCategory);

brandCategoryrouter.delete("/categories/:id", deleteCategory);

export default brandCategoryrouter;
