import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

categorySchema.index({ shopId: 1, name: 1 }, { unique: true });

const brandSchema = new mongoose.Schema(
  {
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      require: true,
      default: "Active",
    },
    products: {
      type: Number,
      default: 0,
    },
    icon: {
      type: String,
      default: "Tag",
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

brandSchema.index({ shopId: 1, name: 1 }, { unique: true });

const categoryModel = mongoose.model("Category", categorySchema);
const brandModel = mongoose.model("Brand", brandSchema);

export { categoryModel, brandModel };
