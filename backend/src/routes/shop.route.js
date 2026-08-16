import { Router } from "express";
import {
  createShop,
  deleteShop,
  getShop,
  updateShop,
} from "../controller/shop.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const shopRoute = Router();

shopRoute.post("/", authenticate, createShop);
shopRoute.get("/", authenticate, getShop);
shopRoute.patch("/:shopId", authenticate, updateShop);
shopRoute.delete("/:shopId", authenticate, deleteShop);

export default shopRoute;
