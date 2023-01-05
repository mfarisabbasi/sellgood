import mongoose from "mongoose";

const featuredSchema = new mongoose.Schema(
  {
    adId: {
      type: String,
      required: true,
    },
    featureItFor: {
      type: String,
      required: true,
    },
    featuredUntil: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Featured = mongoose.model("Featured", featuredSchema);

export default Featured;
