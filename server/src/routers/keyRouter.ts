import express from "express";

// Create an express router
export const keyRouter = express.Router();

// Route: GET /api/keys/paypal
// Description: Retrieves the PayPal client ID
keyRouter.get("/paypal", (req, res) => {
  // Return the PayPal client ID from environment variables (or default to "sb" if not available)
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID || "sb" }); 
});
