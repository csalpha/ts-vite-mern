import { useContext, useEffect } from "react";
import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
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
            {/* Sign In link */}
            <a href='/signin' className='nav-link'>
              Sign In
            </a>
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
