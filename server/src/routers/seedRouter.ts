import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { products } from "../data";
import { ProductModel } from "../models/productModel";

export const seedRouter = express.Router();

seedRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    // Delete all existing products from the database using the ProductModel.
    await ProductModel.deleteMany({});

    // Insert the products from the data file into the database using the ProductModel.
    const createdProducts = await ProductModel.insertMany(products);

    // Send a JSON response containing the created products.
    res.json({ createdProducts });
  })
);
