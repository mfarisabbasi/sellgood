import mongoose from "mongoose";

const featuredSchema = mongoose.Schema({
  adId: {
    type: String,
    required: true,
  },
  featuredUntil: {
    type: Date,
    required: true,
  },
});

const Featured = mongoose.model("Featured", featuredSchema);

export default Featured;
