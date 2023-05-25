// Importing necessary dependencies and components from various libraries
import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignupMutation } from "../hooks/userHooks";
import { Store } from "../Store";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";

// Defining the SignupPage component
const SignupPage = () => {
  // Initializing necessary variables and state variables
  const navigate = useNavigate(); // A function to navigate to different routes
  const { search } = useLocation(); // Accessing the current URL search parameters
  const redirectInUrl = new URLSearchParams(search).get("redirect"); // Extracting the "redirect" parameter from the URL
  const redirect = redirectInUrl ? redirectInUrl : "/"; // Setting the redirect path
  const [name, setName] = useState(""); // Setting up a state variable for the name input field
  const [email, setEmail] = useState(""); // Setting up a state variable for the email input field
  const [password, setPassword] = useState(""); // Setting up a state variable for the password input field
  const [confirmPassword, setConfirmPassword] = useState(""); // Setting up a state variable for the confirm password input field

  const { state, dispatch } = useContext(Store); // Accessing the state and dispatch function from the context
  const { userInfo } = state; // Extracting the user information from the state
  const { mutateAsync: signup, isLoading } = useSignupMutation(); // Calling the useSignupMutation hook to handle the signup logic

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault(); // Preventing the default form submission behavior
    if (password !== confirmPassword) {
      // Checking if the password and confirm password match
      toast.error("Passwords do not match"); // Showing an error toast if they don't match
      return; // Returning from the function
    }
    try {
      // Attempting to sign up the user by calling the signup mutation function
      const data = await signup({
        name,
        email,
        password,
      });
      dispatch({ type: "USER_SIGNIN", payload: data }); // Dispatching an action to update the user information in the state
      localStorage.setItem("userInfo", JSON.stringify(data)); // Storing the user information in the local storage
      navigate(redirect || "/"); // Navigating to the specified redirect path or the homepage
    } catch (err) {
      // Handling any errors that occur during the signup process
      toast.error(getError(err as ApiError)); // Displaying an error toast with the error message
    }
  };

  useEffect(() => {
    // Running the effect when the component mounts or the userInfo changes
    if (userInfo) {
      // Checking if the user is already signed in
      navigate(redirect); // Navigating to the specified redirect path
    }
  }, [navigate, redirect, userInfo]); // Dependency array for the useEffect hook

  // Returning the JSX elements to render the signup form
  return (
    <Container className='small-container'>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className='my-3'>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        {/* Form field for the name input */}
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={(e) => setName(e.target.value)} required />
        </Form.Group>
        {/* Form field for the email input */}
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        {/* Form field for the password input */}
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {/* Form field for the confirm password input */}
        <Form.Group className='mb-3' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        {/* Submit button */}
        <div className='mb-3'>
          <Button type='submit'>Sign Up</Button>
        </div>
        {/* Link to the signin page */}
        <div className='mb-3'>
          Already have an account?{" "}
          <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignupPage;
