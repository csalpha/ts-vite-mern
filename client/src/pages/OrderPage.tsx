import { useContext } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useGetOrderDetailsQuery } from "../hooks/orderHooks";
import { Store } from "../Store";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";
// €

// OrderPage Component
const OrderPage = () => {
  // Accesses the global state from the Store context
  // using the useContext hook and destructures the state object.
  const { state } = useContext(Store);
  const { userInfo } = state; // Retrieves the userInfo property from the state object.

  const params = useParams(); // Retrieves the parameters from the current route using the useParams hook.

  // Destructures the "id" parameter from the params object and assigns it to the orderId variable.
  const { id: orderId } = params;

  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId!);
  // Calls the useGetOrderDetailsQuery hook with the orderId as a parameter to fetch order details.
  // The hook returns an object with properties: data (order details), isLoading (loading state), and error (error information).
  // The destructuring assignment assigns these properties to the corresponding variables: order, isLoading, and error.
  // The "!" after orderId is a non-null assertion operator, indicating that orderId is expected to be non-null.

  return isLoading ? (
    <LoadingBox></LoadingBox> // If isLoading is true, display a loading spinner or message
  ) : error ? (
    <MessageBox variant='danger'>{getError(error as ApiError)}</MessageBox> // If there's an error, display an error message using the getError helper function
  ) : !order ? (
    <MessageBox variant='danger'>Order Not Found</MessageBox> // If order is falsy, display an "Order Not Found" message
  ) : (
    <div>
      <Helmet>
        {/* Set the title of the page to include */}
        <title>Order {orderId}</title>
        the order ID
      </Helmet>
      {/* Display the order ID as a */}
      <h1 className='my-3'>Order {orderId}</h1>
      heading
      <Row>
        <Col md={8}>
          <Card className='mb-3'>
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                {/* Display the shipping address full name */}
                <strong>Name:</strong> {order.shippingAddress.fullName} <br />{" "}
                {/*  Display the shipping address */}
                <strong>Address: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                ,{order.shippingAddress.country}
                details
              </Card.Text>
              {order.isDelivered ? (
                // Display a success message
                <MessageBox variant='success'>
                  Delivered at {order.deliveredAt}
                  if the order is delivered
                </MessageBox>
              ) : (
                // Display a warning message if the order is not delivered
                <MessageBox variant='warning'>Not Delivered</MessageBox>
              )}
            </Card.Body>
          </Card>

          {/* Additional card components for displaying payment details and order items */}
        </Col>
        <Col md={4}>
          <Card className='mb-3'>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    {/* Display the total price of items in the order */}
                    <Col>{order.itemsPrice.toFixed(2)} €</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    {/* Display the shipping price */}
                    <Col> {order.shippingPrice.toFixed(2)} €</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    {/*  Display the tax price */}
                    <Col>{order.taxPrice.toFixed(2)} €</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      {/* Display the total order price */}
                      <strong>{order.totalPrice.toFixed(2)} €</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

//
export default OrderPage;
