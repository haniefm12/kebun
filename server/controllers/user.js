// Import the User model from the models directory
import User from "../models/user.js";

// Import the jsonwebtoken library (corrected import statement)
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "1h", // token will expire in 1 hour
  });
};

// Define a function to handle login requests
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: "Invalid email or password" });
  }
};

// Define a function to handle user signup requests
const signupUser = async (req, res) => {
  // Extract the user's details from the request body
  const { name, email, password, phoneNumber, role, image } = req.body;

  try {
    // Call the signup method on the User model, passing in the user's details
    const user = await User.signup(
      name,
      email,
      password,
      phoneNumber,
      role,
      image
    );
    const token = createToken(user._id);
    // If the signup is successful, return a JSON response with the user's email and user object
    res.status(200).json({ email, token });
  } catch (error) {
    // If an error occurs, catch it and return a JSON response with the error message
    res.status(400).json({ error: error.message });
  }
};

// Export both the loginUser and signupUser functions
export { loginUser, signupUser };
