import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ProductModel } from "../models/productModel";

// Create a router for products
export const productRouter = express.Router();

// Handle GET request for '/api/products'
productRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    // Retrieve all products from the database
    const products = await ProductModel.find();
    res.json(products); // return products as JSON response
  })
);

// Handle GET request for '/api/products/slug/:slug'
productRouter.get(
  "/slug/:slug",
  asyncHandler(async (req: Request, res: Response) => {
    // Find a product with the given slug parameter
    const product = await ProductModel.findOne({ slug: req.params.slug });

    if (product) {
      // If the product is found, return it as JSON response
      res.json(product);
    } else {
      // If the product is not found, return a 404 status and an error message
      res.status(404).json({ message: "Product Not Found" });
    }
  })
);
