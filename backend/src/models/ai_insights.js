import mongoose from "mongoose";

const aiInsightSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    insightType: {
      type: String,
      required: true,
      trim: true,
    },

    periodStart: {
      type: Date,
      default: null,
    },

    periodEnd: {
      type: Date,
      default: null,
    },

    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Equivalent of:
// CREATE INDEX idx_insights_user_created
aiInsightSchema.index({
  userId: 1,
  createdAt: -1,
});

const AIInsight = mongoose.model("AIInsight", aiInsightSchema);

export default AIInsight;