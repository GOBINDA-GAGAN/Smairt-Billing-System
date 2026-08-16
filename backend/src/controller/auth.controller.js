//register user

import { HTTP_STATUS } from "../config/http.config.js";
import validator from "validator";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/jwt.js";
import { env } from "../config/env.config.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Please fill all the fields" });
    }

    if (!validator.isEmail(email)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        sucess: false,
        message: "Please enter a valid email",
      });
    }
    if (
      validator.isEmpty(password) ||
      !validator.isLength(password, { min: 6 })
    ) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        sucess: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        sucess: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = createToken(newUser._id);

    return res.status(HTTP_STATUS.CREATED).json({
      sucess: true,
      message: "User registered successfully",
      user: newUser,
      token,
    });
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // Find user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create token
    const token = createToken(user._id);

    // Safe user data
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      shopId: user.shopId,
    };

    // Store token in HttpOnly cookie
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "User logged in successfully",
      user: userData,
      token,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const currentUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await userModel
      .findById(userId)
      .select("_id name email role shopId")
      .lean();
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      shopId: user.shopId,
    };

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Current user",
      user: userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
