import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { productRouter } from "./routers/productRouter";
import { seedRouter } from "./routers/seedRouter";
import { userRouter } from "./routers/userRouter";
import { orderRouter } from "./routers/orderRouter";

/* This is a setup for an Express server with CORS enabled, allowing requests from "http://localhost:5173". 
The server listens on port 4000 */

dotenv.config(); // Load environment variables from a .env file

// Set the MongoDB connection URI. (environment variable or local MongoDB )
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/ecommerce";

mongoose.set("strictQuery", true); // Enable strict query mode for Mongoose
mongoose
  .connect(MONGODB_URI) // // Connect to MongoDB using the specified URI
  .then(() => {
    console.log("connected to mongodb"); // Connection successful
  })
  .catch(() => {
    console.log("error mongodb"); // Connection failed
  });

// creates an instance of the Express application, which will be used to define routes and handle HTTP requests.
const app = express();

// Enable CORS (Cross-Origin Resource Sharing) with options
app.use(
  cors({
    credentials: true, // Allow sending cookies
    origin: ["http://localhost:5173"], // Allow requests from this origin
  })
);

// This middleware parses incoming requests with JSON payloads.
// It enables the server to interpret JSON data sent in the request body
// and make it available as req.body in route handlers.
app.use(express.json());

// This middleware parses incoming requests with URL-encoded payloads.
// It allows the server to interpret form data sent in the request body
// and make it available as req.body in route handlers.
// The extended: true option allows for nested objects in the URL-encoded data.
app.use(express.urlencoded({ extended: true }));

// Mount the productRouter middleware at the "/api/products" path. This will handle routes related to products.
app.use("/api/products", productRouter);

// Mount the userRouter middleware at the "/api/users" path. This will handle routes related to users.
app.use("/api/users", userRouter);

// Mount the orderRouter middleware at the "/api/orders" path. This will handle routes related to orders.
app.use("/api/orders", orderRouter);

// Mount the seedRouter middleware at the "/api/seed" path. This will handle routes related to seeding data.
app.use("/api/seed", seedRouter);

// Set the port number for the server to listen on.
const PORT = 4000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
