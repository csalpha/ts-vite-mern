import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import "./index.css";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import axios from "axios";

// {} []

// Set the base URL for Axios requests based on the environment
axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:4000" : "/";

// Create a browser router instance
const router = createBrowserRouter(
  // define the routes
  createRoutesFromElements(
    // define top-level route ( App Component)
    <Route path='/' element={<App />}>
      <Route index={true} /* set as the index route */ element={<HomePage />} />
      <Route path='product/:slug' element={<ProductPage />} />
    </Route>
  )
);

// Render the app to the root element using ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // The app is wrapped in React.StrictMode for additional development checks.
  <React.StrictMode>
    {/* The Helmet component is used to manage the document head elements */}
    <HelmetProvider>
      {/* The RouterProvider component is used to provide the router instance  */}
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
