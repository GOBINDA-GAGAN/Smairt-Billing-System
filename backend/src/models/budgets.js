import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },

    period: {
      type: String,
      enum: ["weekly", "monthly", "yearly"],
      default: "monthly",
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Equivalent of:
// UNIQUE(user_id, category_id, period)
budgetSchema.index(
  {
    userId: 1,
    categoryId: 1,
    period: 1,
  },
  {
    unique: true,
  }
);

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;