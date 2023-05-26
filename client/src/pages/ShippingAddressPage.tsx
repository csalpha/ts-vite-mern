// Importing necessary dependencies and components from various libraries
import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { Store } from "../Store";

// Defining the ShippingAddressPage component
const ShippingAddressPage = () => {
  // Initializing necessary variables and state variables
  const navigate = useNavigate(); // A function to navigate to different routes

  // Accessing the state and dispatch function from the context
  const { state, dispatch } = useContext(Store);

  const {
    userInfo,
    cart: { shippingAddress },
  } = state; // Extracting the user information and shippingAddress from the state

  // Running the effect when the component mounts or the userInfo changes
  useEffect(() => {
    // Redirect to sign-in page if user is not logged in
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]); // Dependency array for the useEffect hook

  // State variables for the shipping address form fields
  const [fullName, setFullName] = useState(shippingAddress.fullName || ""); // Setting up a state variable for the fullName input field
  const [address, setAddress] = useState(shippingAddress.address || ""); //Setting up a state variable for the address input field
  const [city, setCity] = useState(shippingAddress.city || ""); //Setting up a state variable for the city input field
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  ); // Setting up a state variable for the postalCode input field
  const [country, setCountry] = useState(shippingAddress.country || ""); //Setting up a state variable for the country input field

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Dispatch action to save the shipping address to the global state
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });

    // Store the shipping address in local storage for persistence
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );

    // Navigate to the payment page
    navigate("/payment");
  };

  // Returning the JSX elements to render the signup form
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className='container small-container'>
        <h1 className='my-3'>Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          {/* Form field for the fullName input */}
          <Form.Group className='mb-3' controlId='fullName'>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          {/* Form field for the address input */}
          <Form.Group className='mb-3' controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          {/* Form field for the city input */}
          <Form.Group className='mb-3' controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          {/* Form field for the postalCode input */}
          <Form.Group className='mb-3' controlId='postalCode'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          {/* Form field for the country input */}
          <Form.Group className='mb-3' controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          {/* Submit button */}
          <div className='mb-3'>
            <Button variant='primary' type='submit'>
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ShippingAddressPage;
