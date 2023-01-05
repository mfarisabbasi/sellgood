// Packages Import
import asyncHandler from "express-async-handler";

// Models Import
import Property from "../models/propertyModel.js";
import Vehicle from "../models/vehicleModel.js";
import Featured from "../models/featuredModel.js";

// @desc Create New Featured Ad
// @route POST /api/featured/create
// @access Private
const createNewFeatured = asyncHandler(async (req, res) => {
  try {
    let foundAd;

    const { adId, featureItFor } = req.body;

    if (!adId || !featureItFor) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const vehicle = await Vehicle.findByIdAndUpdate(
      adId,
      { isFeatured: true },
      { new: true }
    );

    const property = await Property.findByIdAndUpdate(
      adId,
      { isFeatured: true },
      { new: true }
    );

    if (!vehicle && !property) {
      return res.status(404).json({ error: "Ad not found" });
    } else {
      foundAd = vehicle || property;
      let updatedTime;
      const currentTime = new Date();
      if (featureItFor === 3) {
        updatedTime = new Date(currentTime.getTime() + 3 * 24 * 60 * 60 * 1000);
      }
      if (featureItFor === 7) {
        updatedTime = new Date(currentTime.getTime() + 7 * 24 * 60 * 60 * 1000);
      }
      if (featureItFor === 14) {
        updatedTime = new Date(
          currentTime.getTime() + 14 * 24 * 60 * 60 * 1000
        );
      }

      const featured = new Featured({
        adId,
        featuredUntil: updatedTime,
        featureItFor,
        user: req.user,
      });

      const newFeatured = await featured.save();

      return res.status(201).json(newFeatured);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error Featuring Ad" });
  }
});

export { createNewFeatured };
