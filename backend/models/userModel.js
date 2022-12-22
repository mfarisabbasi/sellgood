import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      match: /^\+92(3[0-9]{2})[-. ]?([0-9]{7})$/,
    },
    profilePicture: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/2202/2202112.png",
    },
    accountCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
