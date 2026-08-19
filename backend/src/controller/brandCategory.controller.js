// brandCategory.controller.js

import { HTTP_STATUS } from "../config/http.config.js";
import {  brandModel } from "../models/brandCategory.model.js";
import userModel from "../models/user.model.js";


/* =========================
   BRAND CONTROLLERS
========================= */

// Create Brand
export const createBrand = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.userId;

    const brandName = name.trim().toUpperCase();

    const user = await userModel
      .findById(userId)
      .select("shopId");

    const shopId = user.shopId;

    const existingBrand = await brandModel.findOne({
      shopId,
      name: brandName,
    });

    if (existingBrand) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: "Brand already exists",
      });
    }

    const newBrand = await brandModel.create({
      name: brandName,
      shopId,
      description,
    });

    return res.status(HTTP_STATUS.CREATED).json({
      status: true,
      message: "Brand created successfully",
      brand: newBrand,
    });

  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to create Brand",
      error: error.message,
    });
  }
};

// Get All Brands
export const getBrands = async (req, res) => {
  try {
  } catch (error) {}
};

// Get Single Brand
export const getBrand = async (req, res) => {
  try {
  } catch (error) {}
};

// Update Brand
export const updateBrand = async (req, res) => {
  try {
  } catch (error) {}
};

// Delete Brand
export const deleteBrand = async (req, res) => {
  try {
  } catch (error) {}
};

/* =========================
   CATEGORY CONTROLLERS
========================= */

// Create Category
export const createCategory = async (req, res) => {
  try {
  } catch (error) {}
};

// Get All Categories
export const getCategories = async (req, res) => {
  try {
  } catch (error) {}
};

// Get Single Category
export const getCategory = async (req, res) => {
  try {
  } catch (error) {}
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
  } catch (error) {}
};

// Delete Category
export const deleteCategory = async (req, res) => {
  try {
  } catch (error) {}
};
