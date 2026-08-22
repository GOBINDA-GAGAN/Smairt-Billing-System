// brandCategory.controller.js

import { HTTP_STATUS } from "../config/http.config.js";
import { brandModel, categoryModel } from "../models/brandCategory.model.js";
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

    const user = await userModel.findById(userId).select("shopId");

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
      success: true,
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
    const userId = req.user.userId;

    const user = await userModel.findById(userId).select("shopId");

    const allBrand = await brandModel
      .find({
        shopId: user.shopId,
      })
      .select(" _id name products status icon");

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Fetched all brands",
      brands: allBrand,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch brands",
      error: error.message,
    });
  }
};

// Get Single Brand
export const getBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await brandModel.findById(id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Brand fetched successfully",
      data: brand,
    });
  } catch (error) {
    console.error("Get Brand Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get brand",
      error: error.message,
    });
  }
};

// Update Brand
export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    const brand = await brandModel.findById(id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    // Update name
    if (name !== undefined) {
      brand.name = name.trim();
    }

    // Update status
    if (status !== undefined) {
      brand.status = status;
    }

    await brand.save();

    return res.status(200).json({
      success: true,
      message: "Brand updated successfully",
      data: brand,
    });
  } catch (error) {
    console.error("Update Brand Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update brand",
      error: error.message,
    });
  }
};

// Delete Brand
export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await brandModel.findById(id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    await brandModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (error) {
    console.error("Delete Brand Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete brand",
      error: error.message,
    });
  }
};

/* =========================
   CATEGORY CONTROLLERS
========================= */

// Create Category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const userId = req.user.userId;

    const categoryName = name.trim().toUpperCase();

    const user = await userModel.findById(userId).select("shopId");

    const shopId = user.shopId;

    const existingCategory = await categoryModel.findOne({
      shopId,
      name: categoryName,
    });

    if (existingCategory) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: "Category already exists",
      });
    }

    const newCategory = await categoryModel.create({
      name: categoryName,
      shopId,
      status: "Active",
      products: 0,
      icon: "Folder",
      description: description?.trim() || "",
    });

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Create Category Error:", error);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to create Category",
      error: error.message,
    });
  }
};

// Get All Categories
export const getCategories = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await userModel.findById(userId).select("shopId");

    if (!user || !user.shopId) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Shop not found",
      });
    }

    const categories = await categoryModel
      .find({
        shopId: user.shopId,
      })
      .select("name status products icon description createdAt updatedAt")
      .sort({ createdAt: -1 });

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.error("Get Categories Error:", error);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to get categories",
      error: error.message,
    });
  }
};

// Get Single Category
export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    console.error("Get Category Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get category",
      error: error.message,
    });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, status } = req.body || {};

 

    const category = await categoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

 

    if (name !== undefined) {
      const categoryName = name.trim();

      if (!categoryName) {
        return res.status(400).json({
          success: false,
          message: "Category name cannot be empty",
        });
      }

      category.name = categoryName.toUpperCase();
    }

 

    if (status !== undefined) {
      const allowedStatus = [
        "Active",
        "Inactive",
        "Archived",
      ];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid category status",
        });
      }

      category.status = status;
    }



    await category.save();


    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error("Update Category Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update category",
      error: error.message,
    });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

 

    const category = await categoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

 

    await categoryModel.findByIdAndDelete(id);


    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: category,
    });
  } catch (error) {
    console.error("Delete Category Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: error.message,
    });
  }
};
