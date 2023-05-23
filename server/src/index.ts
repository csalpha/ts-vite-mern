import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { productRouter } from "./routers/productRouter";
import { seedRouter } from "./routers/seedRouter";

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

app.use("/api/products", productRouter);
// Mount the productRouter middleware at the "/api/products" path. This will handle routes related to products.

app.use("/api/seed", seedRouter);
// Mount the seedRouter middleware at the "/api/seed" path. This will handle routes related to seeding data.

const PORT = 4000;
// Set the port number for the server to listen on.

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
