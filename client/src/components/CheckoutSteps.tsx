import { Col, Row } from "react-bootstrap";

const CheckoutSteps = (props: {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
}) => {
  return (
    <Row className='checkout-steps'>
      {/* Step 1: Sign-In */}
      <Col className={props.step1 ? "active" : ""}>Sign-In</Col>
      {/* Step 2: Shipping */}
      <Col className={props.step2 ? "active" : ""}>Shipping</Col>
      {/* Step 3: Payment */}
      <Col className={props.step3 ? "active" : ""}>Payment</Col>
      {/* Step 4: Place Order */}
      <Col className={props.step4 ? "active" : ""}>Place Order</Col>
    </Row>
  );
};

export default CheckoutSteps;
