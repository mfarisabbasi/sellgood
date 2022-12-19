// Packages Import
import express from "express";

// Controller Import
import { sendOTP, verifyOTP } from "../controllers/userController.js";

const router = express.Router();

router.post("/send_otp", sendOTP);
router.post("/verify", verifyOTP);

export default router;
