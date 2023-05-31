import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { User, UserModel } from "../models/userModel";
import { generateToken, isAuth } from "../utils";

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

// defines a route handler for the POST request to the /signup endpoint
userRouter.post(
  "/signup",
  asyncHandler(async (req: Request, res: Response) => {
    // Handle POST request to "/signup" endpoint
    const user = await UserModel.create({
      // Create a new user document in the database
      name: req.body.name, // Extract the name from the request body
      email: req.body.email, // Extract the email from the request body
      password: bcrypt.hashSync(req.body.password), // Hash the password from the request body using bcrypt
    } as User);
    // Create a response JSON object
    res.json({
      _id: user._id, // Include the user's _id in the response
      name: user.name, // Include the user's name in the response
      email: user.email, // Include the user's email in the response
      isAdmin: user.isAdmin, // Include the user's isAdmin status in the response
      token: generateToken(user), // Generate a token for the user and include it in the response
    });
  })
);

// defines a route handler for the PUT request to the /profile endpoint
userRouter.put(
  '/profile', // define the path for the route
  isAuth, // authenticate the user using the isAuth middleware
  asyncHandler(async (req: Request, res: Response) => { // define the route handler callback function
    const user = await UserModel.findById(req.user._id) // find the user in the database by its _id
    // if the user exists, update the user's name, email, and password
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      // if the password is provided in the request body, hash it and update the user's password
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8)
      }
      // save the updated user in the database
      const updatedUser = await user.save()
      // return a JSON response containing data about the updated user
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser), // generate a token for the updated user
      })
      return // exit the route handler
    }

    res.status(404).json({ message: 'User not found' }) // return a 404 Not Found status code if the user is not found
  })
)
