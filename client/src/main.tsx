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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a browser router instance
const router = createBrowserRouter(
  // define the routes
  createRoutesFromElements(
    // define top-level route ( App Component)
    <Route path='/' element={<App />}>
      <Route
        index={true} //set as the index route
        element={<HomePage />}
      />
      <Route path='product/:slug' element={<ProductPage />} />
    </Route>
  )
);
// Create a new instance of QueryClient
const queryClient = new QueryClient();

// Render the app to the root element using ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // The app is wrapped in React.StrictMode for additional development checks.
  <React.StrictMode>
    {/* The Helmet component is used to manage the document head elements */}
    <HelmetProvider>
      {/* The QueryClientProvider component is used to provide the queryClient instance */}
      <QueryClientProvider client={queryClient}>
        {/* The RouterProvider component is used to provide the router instance  */}
        <RouterProvider router={router} />
        {/* The ReactQueryDevtools component provides a UI for inspecting and debugging React Query */}
        <ReactQueryDevtools
          initialIsOpen={false} // The initialIsOpen prop is set to false to keep the devtools closed by default.
        />
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
