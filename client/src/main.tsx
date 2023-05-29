import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StoreProvider } from "./Store";
import CartPage from "./pages/CartPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import ShippingAddressPage from "./pages/ShippingAddressPage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";

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
      <Route path='cart' element={<CartPage />} />
      <Route path='signin' element={<SigninPage />} />
      <Route path='signup' element={<SignupPage />} />
      <Route path='' element={<ProtectedRoute />}>
        <Route path='shipping' element={<ShippingAddressPage />} />
        <Route path='payment' element={<PaymentMethodPage />} />
        <Route path='placeorder' element={<PlaceOrderPage />} />
        <Route path='/order/:id' element={<OrderPage />} />
      </Route>
    </Route>
  )
);
// Create a new instance of QueryClient
const queryClient = new QueryClient();

// Render the app to the root element using ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // The app is wrapped in React.StrictMode for additional development checks.
  <React.StrictMode>
    {/* Wrap the app with the StoreProvider component to provide the store */}
    <StoreProvider>
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
    </StoreProvider>
  </React.StrictMode>
);
