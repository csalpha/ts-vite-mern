import { useContext, useEffect, useState } from "react"; // Importing necessary dependencies from React
import { Button, Form } from "react-bootstrap"; // Importing Button and Form components from react-bootstrap
import { Helmet } from "react-helmet-async"; // Importing Helmet component from react-helmet-async
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from react-router-dom
import CheckoutSteps from "../components/CheckoutSteps"; // Importing CheckoutSteps component from "../components/CheckoutSteps"
import { Store } from "../Store"; // Importing Store context from "../Store"

const PaymentMethodPage = () => {
  const navigate = useNavigate(); // Initializing the useNavigate hook
  const { state, dispatch } = useContext(Store); // Using the useContext hook to access the Store context and extract state and dispatch
  const {
    cart: { shippingAddress, paymentMethod },
  } = state; // Extracting shippingAddress and paymentMethod from the state's cart object

  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || "PayPal"
  ); // Initializing a state variable paymentMethodName and its setter function with the value of paymentMethod from state or defaulting to "PayPal"

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping"); // Navigating to the "/shipping" route if the shippingAddress.address is empty or undefined
    }
  }, [shippingAddress, navigate]); // Running the useEffect hook when the shippingAddress or navigate value changes

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault(); // Preventing the default form submission behavior
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName }); // Dispatching an action to save the payment method using the dispatch function from the Store context
    localStorage.setItem("paymentMethod", paymentMethodName); // Storing the payment method in the localStorage
    navigate("/placeorder"); // Navigating to the "/placeorder" route
  };

  return (
    <div>
      {" "}
      {/* Returning a JSX div */}
      <CheckoutSteps step1 step2 step3></CheckoutSteps>{" "}
      {/* Rendering the CheckoutSteps component with step1, step2, and step3 props */}
      <div className='container small-container'>
        {" "}
        {/* Adding a div with the className 'container small-container' */}
        <Helmet>
          {" "}
          {/* Adding a Helmet component for changing the title of the page */}
          <title>Payment Method</title>{" "}
          {/* Setting the title of the page to "Payment Method" */}
        </Helmet>
        <h1 className='my-3'>Payment Method</h1>{" "}
        {/* Adding a heading with the text "Payment Method" */}
        <Form onSubmit={submitHandler}>
          {" "}
          {/* Creating a Form component with submitHandler function as the onSubmit event handler */}
          <div className='mb-3'>
            {" "}
            {/* Adding a div with the className 'mb-3' */}
            <Form.Check
              type='radio'
              id='PayPal'
              label='PayPal'
              value='PayPal'
              checked={paymentMethodName === "PayPal"} // Setting the checked value based on the equality of paymentMethodName and "PayPal"
              onChange={(e) => setPaymentMethodName(e.target.value)} // Setting the paymentMethodName value based on the selected radio button's value
            />{" "}
            {/* Adding a radio button for PayPal payment method */}
          </div>
          <div className='mb-3'>
            {" "}
            {/* Adding a div with the className 'mb-3' */}
            <Form.Check
              type='radio'
              id='Stripe'
              label='Stripe'
              value='Stripe'
              checked={paymentMethodName === "Stripe"} // Setting the checked value based on the equality of paymentMethodName and "Stripe"
              onChange={(e) => setPaymentMethodName(e.target.value)} // Setting the paymentMethodName value based on the selected radio button's value
            />{" "}
            {/* Adding a radio button for Stripe payment method */}
          </div>
          <div className='mb-3'>
            {" "}
            {/* Adding a div with the className 'mb-3' */}
            <Button type='submit'>Continue</Button>{" "}
            {/* Adding a button with the text "Continue" and the type 'submit' */}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PaymentMethodPage; // Exporting the PaymentMethodPage component as the default export
