// Importing required dependencies and components
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { useGetProductDetailsBySlugQuery } from "../hooks/productHooks";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";

export default function ProductPage() {
  //The useParams hook from React Router is used to get the slug parameter from the URL.
  const params = useParams();
  const { slug } = params;

  // Fetch the product details based on the slug using the custom hook
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!);

  // Conditional rendering is used to handle different scenarios:
  // loading state, error state, product not found, and successful retrieval of product details.
  return isLoading ? (
    // Display a loading box while data is being fetched
    <LoadingBox />
  ) : error ? (
    // Display an error message if there was an error fetching the data
    <MessageBox variant='danger'>{getError(error as ApiError)}</MessageBox>
  ) : !product ? (
    // Display a message if the product was not found
    <MessageBox variant='danger'>Product Not Found</MessageBox>
  ) : (
    // Display the product details if they exist
    <div>
      <Row>
        <Col md={6}>
          <img className='large' src={product.image} alt={product.name}></img>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              {/* Set the title of the page dynamically */}
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              {/* Display the product rating */}
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>Price : {product.price} euros</ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>{product.price} euros</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {/* Display the availability status */}
                      {product.countInStock > 0 ? (
                        <Badge bg='success'>In Stock</Badge>
                      ) : (
                        <Badge bg='danger'>Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className='d-grid'>
                      {/* Add to Cart button */}
                      <Button variant='primary'>Add to Cart</Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
