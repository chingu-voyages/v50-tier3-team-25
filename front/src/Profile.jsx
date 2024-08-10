import React, { useState, useEffect, useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { InputGroup, Form } from 'react-bootstrap'
import { addCredits, createPaymentIntent } from './api'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckOutForm'
import { loadStripe } from '@stripe/stripe-js'
import { AuthContext } from './authContext'

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(stripeKey);

const Profile = ({ setView }) => {
  const { auth } = useContext(AuthContext);
  const [creditsToAdd, setCreditsToAdd] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  // form will show only when typed into input field
  useEffect(() => {
    if (parseFloat(creditsToAdd) > 0) {
      const fetchClientSecret = async () => {
        try {
          const totalAmount = Math.round(parseFloat(creditsToAdd) * 100);
          console.log('Total Amount:', totalAmount); 
          const clientSecret = await createPaymentIntent(totalAmount);
          setClientSecret(clientSecret);
          
        } catch (error) {
          console.error('Error fetching client secret:', error);
        }
      };
      fetchClientSecret();
    }
  }, [creditsToAdd]);

  useEffect(() => {
    auth.updateCredits()
  }, [])

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value == '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setCreditsToAdd(value)
    }

  }

  const handleAddCredits = async () => {
    try {
      console.log('Adding credits:', creditsToAdd); // Log credits to add
      await addCredits({ auth, creditsToAdd, setInformation: auth.updateCredits });
      console.log('credits added '); 
      auth.updateCredits();
      setCreditsToAdd(0);
      setClientSecret('');
    } catch (error) {
      console.error('Failed to add credits:', error);
      setCreditsToAdd('');
      setClientSecret('');
    }
  };

  

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <Container>
          <Row>
            <Col className='text-center'>
              <h2>Profile</h2>
            </Col>
          </Row>
          <Row>
            <Col>{'Username: ' + auth.username}</Col>
          </Row>
          <Row>
            <Col>{'Credits: $' + (auth.credits).toFixed(2)}</Col>
          </Row>
          <Col>
            <InputGroup className='mb-3 mt-3'>
              <InputGroup.Text id='basic-addon1'>$</InputGroup.Text>
              <Form.Control
                aria-label='addCredits'
                aria-describedby='basic-addon1'
                value={creditsToAdd} //value can't handle anything that's not a number entered, bricks itself on "NaN"
                placeholder='Enter Credit Amount'
                onChange={handleInputChange}
              />
            </InputGroup>
            {clientSecret && (
              <Elements key={clientSecret} stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm clientSecret={clientSecret} onPaymentSuccess={handleAddCredits} />
              </Elements>
            )}
          </Col>
          <Row>
            <Col className='d-flex justify-content-center'>
              <Button onClick={() => setView(false)}>OK</Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Profile
