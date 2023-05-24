import jwt from "jsonwebtoken";
import { User } from "./models/userModel";

// Function to generate a JSON Web Token (JWT) for authentication
export const generateToken = (user: User) => {
  // Sign the token with the user's data and a secret key
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "somethingsecret", // Secret key used for signing the token
    {
      expiresIn: "30d", // Expiration time for the token (30 days)
    }
  );
};
