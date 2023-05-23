import { useContext, useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Store } from "./Store";

const App = () => {
  // Access the state and dispatch function from the store using useContext
  const {
    state: { mode }, // Extract the mode from the state
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
      {/* Header */}
      <header>
        <Navbar expand='lg'>
          <Container>
            <Navbar.Brand>ts vite</Navbar.Brand>
          </Container>
          <Nav>
            {/* Switch mode button */}
            <Button variant={mode} onClick={switchModeHandler}>
              <i className={mode === "light" ? "fa fa-sun" : "fa fa-moon"}></i>
            </Button>
            <a href='/cart' className='nav-link'>
              Cart
            </a>
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
