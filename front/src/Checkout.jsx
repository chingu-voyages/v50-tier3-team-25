import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Card, Form } from 'react-bootstrap';
import { getCart } from './utility';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckOutForm';
import { createPaymentIntent } from './api';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(stripeKey);

const Checkout = ({ credits }) => {
  const [useCreditsState, setUseCreditsState] = useState('');
  const [cart, setCart] = useState([]);
  const [clientSecret, setClientSecret] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartData = getCart();
    setCart(cartData);

    const calculatedSubtotal = Object.keys(cartData).reduce((acc, id) => {
      const item = cartData[id];
      return acc + item.price * item.quantity;
    }, 0);

    const taxRate = 0.08;
    const calculatedTaxes = calculatedSubtotal * taxRate;
    const calculatedTotal = calculatedSubtotal + calculatedTaxes;
    const totalAmount = Math.round(calculatedTotal * 100);

    setSubtotal(calculatedSubtotal);
    setTaxes(calculatedTaxes);
    setTotal(calculatedTotal);

    const fetchClientSecret = async () => {
      try {
        const secret = await createPaymentIntent(totalAmount);
        setClientSecret(secret);
      } catch (error) {
        console.error('Error fetching client secret:', error);
      }
    };

    fetchClientSecret();
  }, []);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Container>
      <Row>
        <Row className="mb-3 mt-2">
          <Col>
            <Link variant="primary" to="/menu">Return To Menu</Link>
          </Col>
        </Row>
        <Col>
          <h6>Billing information</h6>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" name="name" />
            </Form.Group>
            <Form.Group controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Address" name="address" />
            </Form.Group>
            <Form.Group controlId="formBasicCity">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="City" name="city" />
            </Form.Group>
            <Form.Group controlId="formBasicState">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="State" name="state" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicZipcode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control type="text" placeholder="Zip Code" name="zipCode" />
            </Form.Group>
          </Form>
          <h6 className="mb-4 mt-4">Payments</h6>
          <Row>
            <Col>
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm clientSecret={clientSecret} />
                </Elements>
              )}
            </Col>
          </Row>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <h6 className="mb-3">Order Summary</h6>
              {Object.keys(cart).map((id) => {
                const item = cart[id];
                return (
                  <div key={id} style={{ listStyle: 'none' }} className="list-unstyled">
                    <li className="list-unstyled pr-5" />
                    <span>{item.name}</span>
                    <span> - x{item.quantity} - </span>
                    <span> ${item.price * item.quantity}</span>
                  </div>
                );
              })}
              <hr />
              <p>Subtotal: ${subtotal.toFixed(2)} </p>
              <p>{'Credit: $' + credits}</p>
              <p>Taxes: ${taxes.toFixed(2)} </p>
              <p>Total: ${total.toFixed(2)} </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
