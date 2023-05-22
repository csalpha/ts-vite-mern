// Importing axios dependency
import axios from "axios";

// Creating an instance of axios with customized configurations
const apiClient = axios.create({
  // Setting the base URL based on the environment
  baseURL:
    process.env.NODE_ENV === "development"
      ? //url is set to
        "http://localhost:4000/"
      : // in production is set to
        "/",
  // Setting the default headers for the requests
  headers: {
    "Content-type": "application/json", // set "Content-type" to "application/json"
  },
});

// The apiClient instance is exported as the default export,
// allowing it to be used in other parts of the application to make HTTP requests.
export default apiClient;
