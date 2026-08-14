import { Router } from "express";

import {
  currentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

authRouter.get("/me", authenticate, currentUser);

authRouter.post("/logout", logoutUser);

export default authRouter;
