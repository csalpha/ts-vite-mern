// Importing required dependencies and components
import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import { useSigninMutation } from "../hooks/userHooks";
import { Store } from "../Store";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";

const SigninPage = () => {
  // Initializing variables and states
  const navigate = useNavigate(); // Used for navigation
  const { search } = useLocation(); // Gets the current URL location
  const redirectInUrl = new URLSearchParams(search).get("redirect"); // Extracts the value of 'redirect' parameter from the URL
  const redirect = redirectInUrl ? redirectInUrl : "/"; // Sets the redirect URL to the extracted value or default to "/"

  const [email, setEmail] = useState(""); // State for email input field
  const [password, setPassword] = useState(""); // State for password input field

  const { state, dispatch } = useContext(Store); // Accesses the global state and dispatch function from the Store context
  const { userInfo } = state; // Extracts 'userInfo' from the global state

  const { mutateAsync: signin, isLoading } = useSigninMutation(); // Custom hook for handling the signin mutation

  // Handles the form submission when the user clicks the Sign In button.
  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await signin({
        email,
        password,
      });
      dispatch({ type: "USER_SIGNIN", payload: data }); // Dispatches an action to update the global state with the user information
      localStorage.setItem("userInfo", JSON.stringify(data)); // Stores user information in localStorage
      navigate(redirect); // Navigates to the 'redirect' URL
    } catch (err) {
      toast.error(getError(err as ApiError)); // Displays an error message using toastify library
    }
  };

  // useEffect hook to check if the user is already signed in
  useEffect(() => {
    if (userInfo) {
      navigate(redirect); // Navigates to the 'redirect' URL if the user is already signed in
    }
  }, [navigate, redirect, userInfo]);

  // Render the sign-in page
  return (
    <Container className='small-container'>
      <Helmet>
        <title>Sign In</title> {/* Sets the page title */}
      </Helmet>
      <h1 className='my-3'>Sign In</h1> {/* Renders the heading */}
      <Form onSubmit={submitHandler}>
        {" "}
        {/* Handles form submission */}
        <Form.Group className='mb-3' controlId='email'>
          {" "}
          {/* Form group for email input */}
          <Form.Label>Email</Form.Label>{" "}
          {/* Renders the label for the email input */}
          <Form.Control
            type='email'
            required
            onChange={(e) =>
              setEmail(e.target.value)
            } /* Updates the 'email' state as the user types */
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          {" "}
          {/* Form group for password input */}
          <Form.Label>Password</Form.Label>{" "}
          {/* Renders the label for the password input */}
          <Form.Control
            type='password'
            required
            onChange={(e) =>
              setPassword(e.target.value)
            } /* Updates the 'password' state as the user types */
          />
        </Form.Group>
        <div className='mb-3'>
          <Button disabled={isLoading} type='submit'>
            {" "}
            {/* Renders the sign-in button */}
            Sign In
          </Button>
          {isLoading && <LoadingBox />}{" "}
          {/* Renders a loading spinner if the sign-in mutation is in progress */}
        </div>
        <div className='mb-3'>
          New customer?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>{" "}
          {/* Renders a link to the signup page with a redirect parameter */}
        </div>
      </Form>
    </Container>
  );
};

export default SigninPage;
