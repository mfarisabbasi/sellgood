import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      match: /^\+\d{1,3} \d{3} \d{3} \d{4}$/,
    },
    name: {
      type: String,
      required: true,
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
