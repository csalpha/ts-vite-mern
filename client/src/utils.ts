import { ApiError } from "./types/ApiError";
import { CartItem } from "./types/Cart";
import { Product } from "./types/Product";

// getError is designed to extract and return the error message from the error object.
export const getError = (error: ApiError) => {
  // If both conditions are met,
  return error.response && error.response.data.message
    ? error.response.data.message // returns the value of error.response.data.message
    : // otherwise,
      error.message; //the function returns the value of error.message
};
// This allows you to access a specific error message from the API response.

export const convertProductToCartItem = (product: Product): CartItem => {
  // Create a new cart item object based on the product
  const cartItem: CartItem = {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    image: product.image,
    price: product.price,
    countInStock: product.countInStock,
    quantity: 1, // Set the initial quantity to 1
  };

  // Return the cart item
  return cartItem;
};
