// Packages Import
import express from "express";

// Controller Import
import { createNewVehicle } from "../controllers/vehicleController.js";

// Middleware Import
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createNewVehicle);

export default router;
