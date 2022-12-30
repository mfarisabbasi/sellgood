import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
    enum: ["House", "Apartment", "Plot", "Commercial"],
  },
  location: {
    type: String,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Property = mongoose.model("Property", propertySchema);

export default Property;
