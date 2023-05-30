// import necessary dependencies
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  SCRIPT_LOADING_STATE,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useContext, useEffect } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../hooks/orderHooks";
import { Store } from "../Store";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";


// OrderPage Component
const OrderPage = () => {
  // Accesses the global state from the Store context
  // using the useContext hook and destructures the state object.
  const { state } = useContext(Store);
  const { userInfo } = state; // Retrieves the userInfo property from the state object.

  const params = useParams(); // Retrieves the parameters from the current route using the useParams hook.

  // Destructures the "id" parameter from the params object and assigns it to the orderId variable.
  const { id: orderId } = params;

  // Calls the useGetOrderDetailsQuery hook with the orderId as a parameter to fetch order details.
  const {
    data: order, // order details
    isLoading,
    error,
    refetch, // refetch function
  } = useGetOrderDetailsQuery(orderId!);
 
  // Calls the usePayOrderMutation hook to pay for the order.
  const { mutateAsync: payOrder, isLoading: loadingPay } =
    usePayOrderMutation();

  // Calls the usePayPalScriptReducer hook to load the PayPal script.
  const testPayHandler = async () => {
    await payOrder({ orderId: orderId! });
    refetch();
    toast.success("Order is paid");
  };

  // Calls the usePayPalScriptReducer hook to load the PayPal script.
  const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer();

  // Calls the useGetPaypalClientIdQuery hook to fetch the PayPal client ID.
  const { data: paypalConfig } = useGetPaypalClientIdQuery();

  // Calls the useEffect hook to load the PayPal script when the component mounts.
  useEffect(() => {
    // If the PayPal client ID is available, load the PayPal script.
    if (paypalConfig && paypalConfig.clientId) {
      // Define a function to load the PayPal script.
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypalConfig!.clientId,
            currency: "USD",
          },
        });
        // Set the loading status to pending.
        paypalDispatch({
          type: "setLoadingStatus",
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };
      // Call the loadPaypalScript function.
      loadPaypalScript();
    }
  }, [paypalConfig]); // Re-run the effect when the paypalConfig changes.

  // Define the PayPal button transaction properties.
  const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
    // Set the transaction amount to the order total price.
    style: { layout: "vertical" },
    createOrder(data, actions) {
      // Call the PayPal SDK to create an order.
      return actions.order
        .create({
          // Set the order details.
          purchase_units: [
            {
              amount: {
                value: order!.totalPrice.toString(),
              },
            },
          ],
        })
        // Return the order ID from the response.
        .then((orderID: string) => {
          return orderID;
        });
    },

    // Call the PayPal SDK to authorize the transaction.
    onApprove(data, actions) {
      return actions.order!.capture().then(async (details) => {
        try {
          // Call the payOrder mutation to pay for the order.
          await payOrder({ orderId: orderId!, ...details });
          // Refetch the order details.
          refetch();
          // Display a success message.
          toast.success("Order is paid successfully");
        } catch (err) {
          // Display an error message.
          toast.error(getError(err as ApiError));
        }
      });
    },
    // Display an error message if there's an error.
    onError: (err) => {
      toast.error(getError(err as ApiError));
    },
  };
 
  // Return the JSX elements to render on the page.
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
                {!order.isPaid && (
                  <ListGroup.Item>
                    {isPending ? (
                      <LoadingBox />
                    ) : isRejected ? (
                      <MessageBox variant='danger'>
                        Error in connecting to PayPal
                      </MessageBox>
                    ) : (
                      <div>
                        <PayPalButtons
                          {...paypalbuttonTransactionProps}
                        ></PayPalButtons>
                        <Button onClick={testPayHandler}>Test Pay</Button>
                      </div>
                    )}
                    {loadingPay && <LoadingBox></LoadingBox>}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

// export the OrderPage component
export default OrderPage;
