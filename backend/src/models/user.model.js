import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["ADMIN", "SHOP_OWNER"],
    default: "SHOP_OWNER",
  },
  currency: {
    type: String,
    default: "USD",
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
