import React from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { products } from "../data";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
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
  );
};

export default HomePage;
