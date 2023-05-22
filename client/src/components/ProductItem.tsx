// Importing required dependencies and components
import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Product } from "../types/Product";
import Rating from "./Rating";

// render individual product items
const ProductItem = (
  { product }: { product: Product } // takes a single prop "product" of type Product
) => {
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
          <Button>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
};

// - The entire component is exported as the default export (for use in other parts of the application )
export default ProductItem;
