import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PaymentCompletion = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="6">
          <Card>
            <Card.Body className="text-center">
              <h2>Payment Successful!</h2>
              <p>Thank you for your purchase. Your payment was successful.</p>
              <Link to="/menu">
                <Button variant="primary">Return to Menu</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentCompletion;
