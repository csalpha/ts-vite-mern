// Importing necessary dependencies
import { useContext, useEffect } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingBox from "../components/LoadingBox";
import { useCreateOrderMutation } from "../hooks/orderHooks";
import { Store } from "../Store";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";

// PlaceOrderPage component
const PlaceOrderPage = () => {
  // Initialize navigate function from react-router-dom
  const navigate = useNavigate();

  // Access state and dispatch function from the global store using useContext
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;

  // Helper function to round a number to 2 decimal places
  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23

  // Calculate prices for items, shipping, tax, and total
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.23 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  // Use the createOrder mutation from the orderHooks custom hook
  const { mutateAsync: createOrder, isLoading } = useCreateOrderMutation();

  // Handle the place order button click event
  const placeOrderHandler = async () => {
    try {
      // Send a request to create a new order
      const data = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      });
      // Clear the cart and remove cartItems from localStorage
      dispatch({ type: "CART_CLEAR" });
      localStorage.removeItem("cartItems");
      // Navigate to the order details page for the newly created order
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      // Display an error message if the request fails
      toast.error(getError(err as ApiError));
    }
  };

  // Check if the payment method is selected, otherwise redirect to the payment page
  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  return (
    <div>
      {/* Render a multi-step progress bar */}
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      {/* Set the title of the page */}
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className='my-3'>Preview Order</h1>
      <Row>
        {/* Render the shipping details */}
        <Col md={8}>
          <Card className='mb-3'>
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                {/* Display the shipping address details */}
                <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                <strong>Address: </strong> {cart.shippingAddress.address},
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                {cart.shippingAddress.country}
              </Card.Text>
              <Link to='/shipping'>Edit</Link>
            </Card.Body>
          </Card>

          <Card className='mb-3'>
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                {/* Display the selected payment method */}
                <strong>Method:</strong> {cart.paymentMethod}
              </Card.Text>
              <Link to='/payment'>Edit</Link>
            </Card.Body>
          </Card>

          <Card className='mb-3'>
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant='flush'>
                {/* Iterate over cart items and display their details */}
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className='align-items-center'>
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className='img-fluid rounded thumbnail'
                        ></img>{" "}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>{item.price} €</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to='/cart'>Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    {/* Display the total price for items */}
                    <Col>{cart.itemsPrice.toFixed(2)} €</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    {/* Display the shipping price */}
                    <Col>{cart.shippingPrice.toFixed(2)} €</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    {/* Display the tax price */}
                    <Col>{cart.taxPrice.toFixed(2)} €</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    {/* Display the total price for the order */}
                    <Col>
                      <strong>{cart.totalPrice.toFixed(2)} €</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className='d-grid'>
                    {/* Render the "Place Order" button */}
                    <Button
                      type='button'
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0 || isLoading}
                    >
                      Place Order
                    </Button>
                    {/* Display a loading spinner if the request is being processed */}
                    {isLoading && <LoadingBox></LoadingBox>}
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

export default PlaceOrderPage;
