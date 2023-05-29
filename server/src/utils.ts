import jwt from "jsonwebtoken";
import { User } from "./models/userModel";
import { NextFunction, Request, Response } from "express";

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

// Custom middleware function to check if the user is authenticated
export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  // Extract the value of the 'authorization' header from the request headers
  const { authorization } = req.headers;

  // If the 'authorization' header exists
  if (authorization) {
    // Extract the token from the authorization header by removing the 'Bearer ' prefix
    const token = authorization.slice(7, authorization.length); // Bearer xxxxx

    // Verify the token by decoding it using the JWT_SECRET environment variable
    //  or a default value if the variable is not set
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret"
    );

    // Assign the decoded user data to the req.user object
    req.user = decode as {
      // decoded user data
      _id: string;
      name: string;
      email: string;
      isAdmin: boolean;
      isSeller: boolean;
      token: string;
    };

    // Call the next middleware function in the chain
    next();
  } else {
    // If the 'authorization' header is not present

    // Return a JSON response with a 401 status code and an error message indicating no token was provided
    res.status(401).json({ message: "No Token" });
  }
};
