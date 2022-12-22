// Packages Import
import asyncHandler from "express-async-handler";

// Models Import
import User from "../models/userModel.js";
import { isValidPhoneNumber } from "../functions/basicFunctions.js";

// Functions Import
import { generateToken } from "../functions/tokenFunctions.js";

// @desc Send OTP
// @route POST /api/users/send_otp
// @access Public
const sendOTP = asyncHandler(async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber)
      return res.status(400).json({ error: "Valid phone number is required." });

    const isValidNumber = isValidPhoneNumber(phoneNumber);

    if (isValidNumber) {
      return res.status(200).json({ otp_code: "333221" });
    } else {
      return res.status(400).json({ error: "Valid phone number is required." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Verify OTP
// @route POST /api/users/verify
// @access Public
const verifyOTP = asyncHandler(async (req, res) => {
  try {
    const { otp_code, phoneNumber } = req.body;

    if (!otp_code || !phoneNumber)
      return res.status(400).json({ error: "Valid OTP is required." });

    if (otp_code === "333221") {
      const userAlreadyExist = await User.findOne({ phoneNumber });

      if (userAlreadyExist && userAlreadyExist.accountCompleted === true) {
        return res.status(200).json({
          account_exist: true,
          user_details: userAlreadyExist._doc,
          access_token: generateToken(userAlreadyExist._id),
        });
      } else {
        return res.status(200).json({ account_exist: false });
      }
    } else {
      return res.status(400).json({ error: "Valid OTP is required." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Create New User Account
// @route POST /api/users/create
// @access Public
const createNewAccount = asyncHandler(async (req, res) => {
  try {
    const { phoneNumber, name, profilePicture } = req.body;

    if (!phoneNumber || !name)
      return res.status(400).json({ error: "All fields are required" });

    const userAlreadyExistWithPhoneNumber = await User.findOne({ phoneNumber });

    if (userAlreadyExistWithPhoneNumber)
      return res
        .status(400)
        .json({ error: "Account already exist with your phone number." });

    const newUser = await User.create({
      phoneNumber,
      name,
      profilePicture,
      accountCompleted: true,
    });

    if (newUser) {
      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        phoneNumber: newUser.phoneNumber,
        profilePicture: newUser.profilePicture,
        accountCompleted: newUser.accountCompleted,
        access_token: generateToken(newUser._id),
      });
    } else {
      return res
        .status(400)
        .json({ error: "Something went wrong while create new user account" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export { sendOTP, verifyOTP, createNewAccount };
