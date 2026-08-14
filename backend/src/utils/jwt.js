import jwt from "jsonwebtoken";
import { env } from "../config/env.config.js";

export const createToken = (userId) => {
  const token = jwt.sign({ userId: userId.toString() }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
  return token;
};
