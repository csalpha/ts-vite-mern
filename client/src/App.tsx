import "./App.css";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { products } from "./data";

function App() {
  return (
    <div className='d-flex flex-column vh-100'>
      <header>
        {" "}
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Container>
            <Navbar.Brand>TS MERN</Navbar.Brand>
          </Container>
          <Nav>
            <a href='/cart' className='nav-link'>
              Cart
            </a>
            <a href='/signin' className='nav-link'>
              Sign In
            </a>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className='mt-3'>
          <Row>
            {products.map((product) => (
              <li key={product.slug}>
                <img
                  src={product.image}
                  alt={product.name}
                  className='product-image'
                />
                <h2>{product.name}</h2>
                <p>{product.price}</p>
              </li>
            ))}
          </Row>
        </Container>
      </main>
      <footer>
        <div className='text-center'>Carlos Serôdio - All rights reserved</div>
      </footer>
    </div>
  );
}

export default App;
