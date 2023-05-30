import { useContext, useEffect } from "react";
import {
  Badge,
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { Store } from "./Store";
import { LinkContainer } from "react-router-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  // Access the state and dispatch function from the store using useContext
  const {
    state: {
      mode, // Extract the mode from the state
      cart, // Extract the cart from the state
      userInfo, // Extract the userInfo from the state
    },
    dispatch, // Extract the dispatch function
  } = useContext(Store);

  useEffect(() => {
    // Set the theme based on the mode
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const switchModeHandler = () => {
    // Dispatch an action to switch the mode
    dispatch({ type: "SWITCH_MODE" });
  };

  const signoutHandler = () => {
    dispatch({ type: "USER_SIGNOUT" }); // Dispatches an action of type "USER_SIGNOUT" to the reducer, triggering the appropriate state update

    localStorage.removeItem("userInfo"); // Removes the "userInfo" key from localStorage, clearing the stored user information
    localStorage.removeItem("cartItems"); // Removes the "cartItems" key from localStorage, clearing the stored cart items
    localStorage.removeItem("shippingAddress"); // Removes the "shippingAddress" key from localStorage, clearing the stored shipping address
    localStorage.removeItem("paymentMethod"); // Removes the "paymentMethod" key from localStorage, clearing the stored payment method

    window.location.href = "/signin"; // Redirects the user to the "/signin" page by updating the URL of the current window
  };

  return (
    <div className='d-flex flex-column vh-100'>
      <ToastContainer position='bottom-center' limit={1} />
      {/* Header */}
      <header>
        <Navbar expand='lg'>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>ts vite</Navbar.Brand>
            </LinkContainer>
          </Container>
          <Nav>
            {/* Switch mode button */}
            <Button variant={mode} onClick={switchModeHandler}>
              <i className={mode === "light" ? "fa fa-sun" : "fa fa-moon"}></i>
            </Button>
            <Link to='/cart' className='nav-link'>
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg='danger'>
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            {userInfo ? (
              // Condition: If userInfo exists (user is signed in)
              <NavDropdown
              title={userInfo.name}
              id="basic-nav-dropdown"
              className="dropdown-menu-start"
            >
              <LinkContainer to="/orderhistory">
                <NavDropdown.Item>Order History</NavDropdown.Item>
              </LinkContainer>
                {/* Render a NavDropdown component */}
                <Link
                  className='dropdown-item'
                  to='#signout'
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
                {/* Render a link for signing out */}
              </NavDropdown>
            ) : (
              // Condition: If userInfo does not exist (user is not signed in)
              <Link className='nav-link' to='/signin'>
                Sign In
              </Link>
              /* Render a link for signing in */
            )}
          </Nav>
        </Navbar>
      </header>
      {/* Main content */}
      <main>
        <Container className='mt-3'>
          {/* Renders the child route's element, if there is one. */}
          <Outlet />
        </Container>
      </main>
      {/* Footer */}
      <footer>
        <div className='text-center'>Carlos Serôdio - All rights reserved</div>
      </footer>
    </div>
  );
};

export default App;
