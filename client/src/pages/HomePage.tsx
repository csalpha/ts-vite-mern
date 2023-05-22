import axios from "axios"; // The component uses axios to make HTTP requests
import { useEffect, useReducer } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom"; // The component uses react-router-dom for navigation.
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ApiError } from "../types/ApiError";
import { Product } from "../types/Product";
import { getError } from "../utils";

// define State type
type State = {
  products: Product[]; // Array to store product objects
  loading: boolean; // Indicates if the state is in a loading state
  error: string; // Holds error message or an empty string if no error
};

// define Action Type
type Action =
  // Action dispatched before initiating an asynchronous request
  | { type: "FETCH_REQUEST" }
  // Action dispatched when the asynchronous request is successful
  | {
      type: "FETCH_SUCCESS";
      payload: Product[]; // An array of products returned from the request
    }
  // Action dispatched when the asynchronous request fails
  | {
      type: "FETCH_FAIL";
      payload: string; // A string describing the error
    };

// define initialState object
const initialState: State = {
  products: [], // An array to store the fetched products. Initially empty.
  loading: true, // A boolean flag indicating whether the fetching process is in progress. Initially set to true.
  error: "", // A string to store any error message that occurs during the fetching process. Initially empty.
};

// Reducer function to manage the state of the component
const reducer = (state: State, action: Action) => {
  // The reducer function handles different actions to update the state based on the action type.
  switch (action.type) {
    // update the state based on the action type "FETCH_REQUEST"
    case "FETCH_REQUEST":
      return {
        ...state, // creates a new object with all the properties from the current state object.
        loading: true, // set loading property to true
      };
    // update the state based on the action type "FETCH_SUCCESS"
    case "FETCH_SUCCESS":
      return {
        ...state, // creates a new object with all the properties from the current state object.
        products: action.payload, // products property is updated with action.payload
        loading: false, // set loading property to false
      };
    // update the state based on the action type "FETCH_FAIL"
    case "FETCH_FAIL":
      return {
        ...state, // creates a new object with all the properties from the current state object.
        loading: false, // set loading property to false
        error: action.payload, // error property is updated with action.payload
      };
    // defaut case for any other action types
    default:
      // return current state object
      return state;
  }
};

//defines a HomePage component that displays a list of products fetched from an API endpoint.
const HomePage = () => {
  // The component manages its state using the useReducer hook.

  // Initialize state using the reducer and initial state
  const [
    { loading, error, products }, // The state is defined as an object with products, loading, and error properties.
    dispatch,
  ] = useReducer<React.Reducer<State, Action>>(reducer, initialState);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // The key feature of async functions is that they always return a promise.
    // The promise can be in one of three states: pending, fulfilled, or rejected.

    // Fetch data when the component mounts
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" }); // Dispatch "FETCH_REQUEST" action to indicate data fetching is in progress
      try {
        // the axios.get function is called to make an HTTP GET request to the /api/products endpoint.
        // await - wait for the response to be returned from the server
        const result = await axios.get("/api/products");

        // If the data is successfully fetched
        dispatch({
          type: "FETCH_SUCCESS", // Dispatch "FETCH_SUCCESS" action
          payload: result.data, // Pass the retrieved product data as the payload
        });
      } catch (err) {
        // If an error occurs
        dispatch({
          type: "FETCH_FAIL", // Dispatch "FETCH_FAIL" action
          payload: getError(err as ApiError), // Pass the error message obtained from getError as the payload
        });
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  /* This conditional rendering allows for different UI components
     to be displayed based on the state of the data fetching process. */
  return loading ? (
    // Display a loading spinner if data is being fetched
    <LoadingBox />
  ) : error ? (
    // Display an error message if there was an error fetching the data
    <MessageBox variant='danger'>{error}</MessageBox>
  ) : (
    // Display the list of products if data was successfully fetched
    <Row>
      {/* the products array is mapped over and a list of products is rendered inside a Row component. */}
      {products.map((product) => (
        // Each product is displayed inside a Col component, with its details and an image.
        <Col key={product.slug} sm={6} md={4} lg={3}>
          {/* The Link component is used to create a navigation link to the specific product page. */}
          <Link to={"/product/" + product.slug}>
            <img
              src={product.image}
              alt={product.name}
              className='product-image'
            />
            <h2>{product.name}</h2>
            <p>{product.price} </p>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default HomePage;
