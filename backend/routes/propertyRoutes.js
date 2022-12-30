// Packages Import
import express from "express";

// Controller Import
import {
  createNewProperty,
  searchProperties,
} from "../controllers/propertyController.js";

// Middleware Import
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createNewProperty);
router.get("/", searchProperties);

export default router;
