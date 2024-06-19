import User from "../models/user.js";
import mongoose from "mongoose";

const getUserData = async (req, res) => {
  // with spesific user_id that login?
  const user_id = req.user._id;
  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error getting user data" });
  }
};
export default getUserData;
