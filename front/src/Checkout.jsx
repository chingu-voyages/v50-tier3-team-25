import React, { useContext, useEffect, useState } from 'react';
import { Container, Col, Row, Card, Form } from 'react-bootstrap';
import { getCart, clearCart } from './utility';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckOutForm';
import { createPaymentIntent, useCredits } from './api';
import { AuthContext } from './authContext';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(stripeKey);

const Checkout = ({setView}) => {
  const {auth} = useContext(AuthContext)
  const [useCreditsState, setUseCreditsState] = useState(false);
  const [cart, setCart] = useState([]);
  const [clientSecret, setClientSecret] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [total, setTotal] = useState(0);
  const [adjustedTotal, setAdjustedTotal] = useState(0);


  useEffect(() => {
    const cartData = getCart();
    setCart(cartData);

    if (Object.keys(cartData).length > 0) {
    const calculatedSubtotal = Object.keys(cartData).reduce((acc, id) => {
      const item = cartData[id];
      return acc + item.price * item.quantity;
    }, 0);

    const taxRate = 0.08;
    const calculatedTaxes = calculatedSubtotal * taxRate;
    const calculatedTotal = calculatedSubtotal + calculatedTaxes;

    const totalAmount = useCreditsState ? calculatedTotal - parseFloat(auth.credits)  : calculatedTotal

    const totalInCents = Math.max(Math.round(totalAmount * 100), 1);

    setSubtotal(calculatedSubtotal);
    setTaxes(calculatedTaxes);
    setTotal(calculatedTotal);
    setAdjustedTotal(totalAmount)

    const fetchClientSecret = async () => {
      try {
        const secret = await createPaymentIntent(totalInCents);
        setClientSecret(secret);
      } catch (error) {
        console.error('Error fetching client secret:', error);
      }
    };

    fetchClientSecret();
    }
  }, [useCreditsState, auth.credits]);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  const handlePaymentSuccess = async () => {
    if (useCreditsState) {
      try {
        const creditsUsed = Math.min(auth.credits, total);
        await useCredits({ auth, creditsUsed, setInformation: auth.updateCredits });
        console.log(creditsUsed)
        // update credits
      auth.updateCredits()

      } catch (error) {
        console.error('Error using credits:', error);
      }
    }

    clearCart('');
    setCart([]);
  };

  useEffect(() => {
    console.log("Credits:", (auth.credits/100).toFixed(2));
  }, [auth.credits]);



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
          <Form.Group>
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Name" 
                id="name" 
                name="name" 
                autoComplete="name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="address">Address</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Address" 
                id="address" 
                name="address" 
                autoComplete="address-line1"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="city">City</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="City" 
                id="city" 
                name="city" 
                autoComplete="address-level2"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="state">State</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="State" 
                id="state" 
                name="state" 
                autoComplete="address-level1"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="zipCode">Zip Code</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Zip Code" 
                id="zipCode" 
                name="zipCode" 
                autoComplete="postal-code"
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type='checkbox'
                label= {"Available credits: " + ( auth.credits/100).toFixed(2)}
                checked={useCreditsState}
                onChange={(e) => setUseCreditsState(e.target.checked)}
              />
            </Form.Group>
          </Form>
          <h6 className="mb-4 mt-4">Payments</h6>
          <Row>
            <Col>
              {clientSecret && (
                <Elements key={clientSecret} options={options} stripe={stripePromise}>
                  <CheckoutForm clientSecret={clientSecret} onPaymentSuccess={handlePaymentSuccess}/>
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
                  <div key={`${id}-${item.name}`} style={{ listStyle: 'none' }} className="list-unstyled">
                    <li className="list-unstyled pr-5" />
                    <span>{item.name}</span>
                    <span> - x{item.quantity} - </span>
                    <span> ${item.price * item.quantity}</span>
                  </div>
                );
              })}
              <hr />
              <p>Subtotal: ${subtotal.toFixed(2)} </p>
              <p>{'Credit: -$' + (useCreditsState ? Math.min(auth.credits/100, total).toFixed(2) : '0.00')}</p>
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
