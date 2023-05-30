// importing necessary packages and components
import { useContext } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { CartItem } from "../types/Cart";

// CartPage component
const CartPage = () => {
  // creating a navigate function to navigate to a different page
  const navigate = useNavigate();

  // Accessing state and dispatch function from the Store context
  const {
    state: {
      mode, // dark or light mode
      cart: { cartItems }, // cart items
    },
    dispatch, // dispatch function
  } = useContext(Store); // Store context

  // Function to update the quantity of an item in the cart
  const updateCartHandler = (item: CartItem, quantity: number) => {
    // Check if the quantity is 0
    if (item.countInStock < quantity) {
      // Display a toast message if the quantity is 0
      toast.warn("Sorry. Product is out of stock");
      // Return from the function
      return;
    }
    // Dispatch the action to update the quantity of the item in the cart
    dispatch({
      type: "CART_ADD_ITEM", // action type
      payload: { ...item, quantity }, // payload
    });
  };

  // Function to handle the checkout process
  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping"); // Navigate to the signin page
  };

  const removeItemHandler = (item: CartItem) => {
    // Dispatch the action to remove the item from the cart
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {/* Displaying cart items or an empty cart message */}
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to='/'>Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item: CartItem) => (
                <ListGroup.Item key={item._id}>
                  <Row className='align-items-center'>
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='img-fluid rounded thumbnail'
                      ></img>{" "}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      {/* Render Decrease quantity button */}
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant={mode}
                        disabled={item.quantity === 1}
                      >
                        <i className='fas fa-minus-circle'></i>
                      </Button>{" "}
                      <span>{item.quantity}</span>
                      {/* Render Increase quantity button */}
                      <Button
                        variant={mode}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className='fas fa-plus-circle'></i>
                      </Button>
                    </Col>
                    <Col md={3}>€{item.price}</Col>
                    <Col md={2}>
                      {/* Render Remove item button */}
                      <Button
                        variant={mode}
                        onClick={() => removeItemHandler(item)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                {/* Displaying subtotal */}
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    items) : €
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className='d-grid'>
                    {/* Render CheckoutHandler button */}
                    <Button
                      type='button'
                      variant='primary'
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;

