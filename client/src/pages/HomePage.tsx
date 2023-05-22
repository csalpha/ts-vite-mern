// Importing required dependencies and components
import { Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductItem from "../components/ProductItem";
import { useGetProductsQuery } from "../hooks/productHooks";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";

// HomePage component to render the home page
const HomePage = () => {
  // Fetching products using the useGetProductsQuery hook
  const { data: products, isLoading, error } = useGetProductsQuery();

  // Rendering different components based on the loading and error states
  return isLoading ? (
    // Display a loading spinner while data is being fetched
    <LoadingBox />
  ) : error ? (
    // Display an error message if there's an error fetching the data
    <MessageBox variant='danger'>{getError(error as ApiError)}</MessageBox>
  ) : (
    // Render the products if data is successfully fetched
    <Row>
      <Helmet>
        <title>TS VITE MERN</title>
      </Helmet>
      {/* Map through the products and render a ProductItem component for each product */}
      {products!.map((product) => (
        <Col key={product.slug} sm={6} md={4} lg={3}>
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default HomePage;
