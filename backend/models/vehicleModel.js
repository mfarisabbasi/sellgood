import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  engine: {
    type: String,
    required: true,
  },
  airbags: {
    type: Number,
  },
  transmission: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
