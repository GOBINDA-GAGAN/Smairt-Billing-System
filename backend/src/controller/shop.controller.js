import { HTTP_STATUS } from "../config/http.config.js";
import userModel from "../models/user.model.js";
import shopModel from "../models/shop.model.js";

export const createShop = async (req, res) => {
  try {
    const {
      name,
      type,
      ownerName,
      mobileNumber,
      email,
      gstNumber,
      fssaiNumber,
      address,
      city,
      state,
      pinCode,
    } = req.body;
    if (
      !name ||
      !type ||
      !ownerName ||
      !mobileNumber ||
      !email ||
      !gstNumber ||
      !fssaiNumber ||
      !address ||
      !city ||
      !state ||
      !pinCode
    ) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        status: false,
        message: "All fields are required",
      });
    }

    const newShop = {
      name,
      type,
      ownerName,
      mobileNumber,
      email,
      gstNumber,
      fssaiNumber,
      address,
      city,
      state,
      pinCode,
      userId: req.user.userId,
    };

    const shop = await shopModel.create(newShop);

    await userModel.findByIdAndUpdate(req.user.userId, {
      shopId: shop._id,
    });

    return res.status(HTTP_STATUS.CREATED).json({
      status: true,
      message: "Your shop created",
      shop: shop,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to create shop",
    });
  }
};

export const getShop = async (req, res) => {
  try {
    const shop = await shopModel.findOne({
      userId: req.user.userId,
    });

    if (!shop) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Shop not found",
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Shop fetched successfully",
      shop,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to get shop",
    });
  }
};

export const updateShop = async (req, res) => {
  try {
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to update shop",
    });
  }
};

export const deleteShop = async (req, res) => {
  try {
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to delete shop",
    });
  }
};
