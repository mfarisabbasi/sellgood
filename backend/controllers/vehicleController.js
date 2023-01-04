// Packages Import
import asyncHandler from "express-async-handler";

// Models Import
import Vehicle from "../models/vehicleModel.js";

// @desc Create New Vehicle
// @route POST /api/vehicles/create
// @access Private
const createNewVehicle = asyncHandler(async (req, res) => {
  try {
    const {
      make,
      model,
      price,
      mileage,
      location,
      engine,
      airbags,
      transmission,
      images,
      description,
    } = req.body;

    if (
      !make ||
      !model ||
      !price ||
      !mileage ||
      !location ||
      !engine ||
      !transmission ||
      !images ||
      !description
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const vehicle = new Vehicle({
      make,
      model,
      price,
      mileage,
      location,
      engine,
      airbags,
      transmission,
      images,
      description,
      user: req.user,
    });

    const newVehicle = await vehicle.save();

    return res.status(201).json(newVehicle);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error creating property" });
  }
});

export { createNewVehicle };
