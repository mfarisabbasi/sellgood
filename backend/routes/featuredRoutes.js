// Packages Import
import express from "express";

// Controller Import
import { createNewFeatured } from "../controllers/featuredController.js";

// Middleware Import
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createNewFeatured);

export default router;
