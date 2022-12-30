// Packages Import
import asyncHandler from "express-async-handler";

// Models Import
import User from "../models/userModel.js";
import Property from "../models/propertyModel.js";

// @desc Create New Property
// @route POST /api/properties/create
// @access Private
const createNewProperty = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      propertyType,
      location,
      area,
      bedrooms,
      bathrooms,
      images,
    } = req.body;

    if (
      !title ||
      !description ||
      !price ||
      !propertyType ||
      !location ||
      !area ||
      !bathrooms ||
      !images
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const property = new Property({
      title,
      description,
      price,
      propertyType,
      location,
      area,
      bedrooms,
      bathrooms,
      images,
      user: req.user,
    });

    const newProperty = await property.save();

    return res.status(201).json(newProperty);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error creating property" });
  }
});

// @desc Search Properties
// @route GET /api/properties?bedrooms=3&bathrooms=2&location=Lahore
// @access Public
const searchProperties = asyncHandler(async (req, res) => {
  try {
    const query = {};
    if (req.query.priceMin && req.query.priceMax) {
      query.price = { $gte: req.query.priceMin, $lte: req.query.priceMax };
    }
    if (req.query.bedroomsMin && req.query.bedroomsMax) {
      query.bedrooms = {
        $gte: req.query.bedroomsMin,
        $lte: req.query.bedroomsMax,
      };
    }
    if (req.query.bathroomsMin && req.query.bathroomsMax) {
      query.bathrooms = {
        $gte: req.query.bathroomsMin,
        $lte: req.query.bathroomsMax,
      };
    }
    if (req.query.propertyType) query.propertyType = req.query.propertyType;
    if (req.query.location) query.location = req.query.location;
    if (req.query.areaMin && req.query.areaMax) {
      query.area = { $gte: req.query.areaMin, $lte: req.query.areaMax };
    }

    const properties = await Property.find(query);

    return res.status(200).json(properties);
  } catch (err) {
    return res.status(500).json({ error: "Error searching properties" });
  }
});

export { createNewProperty, searchProperties };
