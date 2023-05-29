import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { OrderModel } from "../models/orderModel";
import { Product } from "../models/productModel";
import { isAuth } from "../utils";
export const orderRouter = express.Router();

orderRouter.get(
  "/:id", // Route path with a parameter ":id" representing the order ID
  isAuth, // Middleware function to check if the user is authenticated
  asyncHandler(async (req: Request, res: Response) => {
    // Route handler function
    const order = await OrderModel.findById(req.params.id); // Retrieve the order from the database using the ID
    if (order) {
      res.json(order); // If the order is found, send the order details as a JSON response
    } else {
      res.status(404).json({ message: "Order Not Found" }); // If the order is not found, send a 404 status code with a JSON response containing an error message
    }
  })
);

// Handle POST request for '/api/orders'
orderRouter.post(
  "/",
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    //if the cart is empty
    if (req.body.orderItems.length === 0) {
      // Return a JSON response with an error message
      res.status(400).json({ message: "Cart is empty" });
    } else {
      // Create a new order document in the database
      const createdOrder = await OrderModel.create({
        // Map over the orderItems array in the request body
        // and create a new array of items with each item assigned a product ID
        orderItems: req.body.orderItems.map((x: Product) => ({
          ...x,
          product: x._id,
        })),

        // Assign the value of the shippingAddress field  from the request body to the shippingAddress field of the order document
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        // Assign the user ID of the authenticated user (stored in req.user._id) to the user field of the order document
        user: req.user._id,
      });

      // Return a JSON response with a success message and the created order details
      res.status(201).json({ message: "Order Created", order: createdOrder });
    }
  })
);

// Handle GET request for '/api/orders'
orderRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    // Retrieve all orders from the database
    const orders = await OrderModel.find();
    res.json(orders); // return orders as JSON response
  })
);
