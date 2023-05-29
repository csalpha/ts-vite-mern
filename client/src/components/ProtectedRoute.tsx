// Importing necessary dependencies
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Store } from "../Store";

// Creating a ProtectedRoute component
const ProtectedRoute = () => {
  // Accessing the userInfo from the global state using the useContext hook
  const {
    state: { userInfo },
  } = useContext(Store);

  // Checking if userInfo exists
  if (userInfo) {
    // If userInfo exists, render the nested routes using the Outlet component
    return <Outlet />;
  } else {
    // If userInfo does not exist, redirect to the sign-in page using the Navigate component
    return <Navigate to='/signin' />;
  }
};

export default ProtectedRoute;
