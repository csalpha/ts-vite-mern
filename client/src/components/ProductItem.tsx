// Importing required dependencies and components
import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Product } from "../types/Product";
import { Store } from "../Store";
import { CartItem } from "../types/Cart";
import { toast } from "react-toastify";
import { convertProductToCartItem } from "../utils";
import Rating from "./Rating";
import { useContext } from "react";

// render individual product items
const ProductItem = (
  { product }: { product: Product } // takes a single prop "product" of type Product
) => {
  const {
    state, // represents the current state of the application obtained from the context.
    dispatch, // is a function used to dispatch actions to update the state.
  } = useContext(Store); // allows you to access the current context value provided by the Store context.

  // Destructure the cartItems from the state
  const {
    cart: { cartItems },
  } = state;

  // Define the addToCartHandler function
  const addToCartHandler = (item: CartItem) => {
    // Check if the item already exists in the cart
    const existItem = cartItems.find((x) => x._id === product._id);

    // Calculate the new quantity
    const quantity = existItem ? existItem.quantity + 1 : 1;

    // Check if the product is in stock
    if (product.countInStock < quantity) {
      // Display an alert if the product is out of stock
      alert("Sorry. Product is out of stock");
      return;
    }

    // Dispatch the action to add the item to the cart
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
    toast.success("Product added to the cart");
  };

  return (
    // renders a Card to display the product information
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className='card-img-top' alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        {/* The Rating component is rendered */}
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {/* if countInStock is 0 */}
        {product.countInStock === 0 ? (
          // "Out of stock" button is rendered
          <Button variant='light' disabled>
            Out of stock
          </Button>
        ) : (
          //otherwise
          // "Add to cart" button is rendered.
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

// - The entire component is exported as the default export (for use in other parts of the application )
export default ProductItem;
