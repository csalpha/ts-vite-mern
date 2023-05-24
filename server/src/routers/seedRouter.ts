import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { products, users } from "../data";
import { ProductModel } from "../models/productModel";
import { UserModel } from "../models/userModel";

export const seedRouter = express.Router();

seedRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    // Delete all existing products from the database using the ProductModel.
    await ProductModel.deleteMany({});

    // Insert the products from the data file into the database using the ProductModel.
    const createdProducts = await ProductModel.insertMany(products);

    // Delete all existing users from the database using the UserModel.
    await UserModel.deleteMany({});

    // Insert the users from the data file into the database using the UserModel.
    const createdUsers = await UserModel.insertMany(users);

    // Send a JSON response containing the created products, and the created users .
    res.json({ createdProducts, createdUsers });
  })
);
