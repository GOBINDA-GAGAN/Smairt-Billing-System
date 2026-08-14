import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
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
      default: null,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 255,
    },

    notes: {
      type: String,
      default: "",
    },

    transactionDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


transactionSchema.index({
  userId: 1,
  transactionDate: -1,
});


transactionSchema.index({
  categoryId: 1,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;