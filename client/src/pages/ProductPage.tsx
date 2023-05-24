// Importing required dependencies and components
import { useContext } from "react";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { useGetProductDetailsBySlugQuery } from "../hooks/productHooks";
import { ApiError } from "../types/ApiError";
import { convertProductToCartItem, getError } from "../utils";
import { Store } from "../Store";

const ProductPage = () => {
  //The useParams hook from React Router is used to get the slug parameter from the URL.
  const params = useParams();
  const { slug } = params;

  // Fetch the product details based on the slug using the custom hook
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!);

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const navigate = useNavigate();

  // Function to handle adding a product to the cart
  const addToCartHandler = () => {
    // Check if the product already exists in the cart
    const existItem = cart.cartItems.find((x) => x._id === product!._id);

    // Calculate the new quantity of the product
    const quantity = existItem ? existItem.quantity + 1 : 1;

    // Check if the product is out of stock
    if (product!.countInStock < quantity) {
      toast.warn("Sorry. Product is out of stock");
      return;
    }

    // Dispatch an action to add the product to the cart
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...convertProductToCartItem(product!), quantity },
    });

    // Show a success message
    toast.success("Product added to the cart");

    // Navigate to the cart page (optional)
    // navigate("/cart");
  };

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
            <ListGroup.Item>Price : {product.price} €</ListGroup.Item>
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
                    <Col>{product.price} €</Col>
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
                      <Button onClick={addToCartHandler} variant='primary'>
                        Add to Cart
                      </Button>
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
};

export default ProductPage;
