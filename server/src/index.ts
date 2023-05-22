import cors from "cors";
import express, { Request, Response } from "express";
import { products } from "./data";

/* This is a setup for an Express server with CORS enabled, allowing requests from "http://localhost:5173". 
The server listens on port 4000 and responds with the products data when a GET request is made to "/api/products". */

const app = express();

// Enable CORS (Cross-Origin Resource Sharing) with options
app.use(
  cors({
    credentials: true, // Allow sending cookies
    origin: ["http://localhost:5173"], // Allow requests from this origin
  })
);

// Define a GET endpoint at "/api/products"
app.get("/api/products", (req: Request, res: Response) => {
  res.json(products); // Send the list of products as JSON response
});

const PORT = 4000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
