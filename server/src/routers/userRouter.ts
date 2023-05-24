import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/userModel";
import { generateToken } from "../utils";

// Create an instance of the Express Router
export const userRouter = express.Router();

// Handler for the POST /api/users/signin route
userRouter.post(
  "/signin",
  asyncHandler(async (req: Request, res: Response) => {
    // Find a user in the database based on the provided email
    const user = await UserModel.findOne({ email: req.body.email });

    if (user) {
      // Compare the provided password with the hashed password stored in the database
      if (bcrypt.compareSync(req.body.password, user.password)) {
        // Generate a token for authentication
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }

    // Return a 401 Unauthorized status if the email or password is invalid
    res.status(401).json({ message: "Invalid email or password" });
  })
);

// Handler for the GET /api/users route
userRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    // Retrieve all users from the database
    const users = await UserModel.find();

    // Return the users as a JSON response
    res.json(users);
  })
);
