// import necessary dependencies
import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Order,OrderModel } from "../models/orderModel";
import { Product } from "../models/productModel";
import { isAuth } from "../utils";

// Create an express router
export const orderRouter = express.Router();

// Handle GET request for '/api/orders/mine'
orderRouter.get(
  '/mine', // Route path
  isAuth, // Middleware function to check if the user is authenticated
  // Route handler function
  asyncHandler(async (req: Request, res: Response) => {
    // Retrieve all orders from the database where the user ID of the order document matches the user ID of the authenticated user
    const orders = await OrderModel.find({ user: req.user._id }) 
    res.json(orders) // Return the orders as a JSON response
  })
)

// Handle GET request for '/:id' route
orderRouter.get(
  "/:id", // Route path with a parameter ":id" representing the order ID
  isAuth, // Middleware function to check if the user is authenticated
  asyncHandler(
    async (req: Request, res: Response) => {
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
      } as Order); // Cast the created order to the Order type

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

// Handle PUT request for '/api/orders/:id/pay'
orderRouter.put(
  "/:id/pay", // Route path with a parameter ":id" representing the order ID
  isAuth, // Middleware function to check if the user is authenticated
  asyncHandler(async (req: Request, res: Response) => { // Route handler function
    // Find the order by ID
    const order = await OrderModel.findById(req.params.id);

    // Check if the order exists
    if (order) {
      // Update the order properties
      order.isPaid = true;
      order.paidAt = new Date(Date.now());
      // Assign the paymentResult field of the order document to the paymentResult field of the request body
      order.paymentResult = {
        paymentId: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      // Save the updated order
      const updatedOrder = await order.save();

      // Send the response
      res.send({ order: updatedOrder, message: "Order Paid Successfully" });
    } else {
      // If order is not found, return a 404 error
      res.status(404).json({ message: "Order Not Found" });
    }
  })
);
