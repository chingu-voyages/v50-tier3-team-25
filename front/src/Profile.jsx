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

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
const stripePromise = loadStripe(stripeKey)

const Profile = ({setView}) => {
  const {auth} = useContext(AuthContext)
  const [creditsToAdd, setCreditsToAdd] = useState('')
  const [clientSecret, setClientSecret] = useState('')

  // form will show only when typed into input field
  useEffect(() => {
    if (creditsToAdd > 0) {
      const fetchClientSecret = async () => {
        try {
          const totalAmount = Math.round(creditsToAdd * 100)
          const clientSecret = await createPaymentIntent(totalAmount)
          setClientSecret(clientSecret)
        } catch (error) {
          console.error('Error fetching client secret:', error)
        }
      }
      fetchClientSecret()
    }
  }, [creditsToAdd])

  const handleAddCredits = async (e) => {
    e.preventDefault()
    try {
      await addCredits({auth, creditsToAdd, setInformation: auth.updateCredits})
      auth.updateCredits()
    } catch (error) {
      console.error('Failed to add credits:', error)
    }
  }

  const handlePaymentSuccess = async () => {
    try {
      await auth.updateCredits();
      setCreditsToAdd('')
      setClientSecret('')
    } catch (error) {
      console.error('Failed to add credits:', error)
    }
  }

  

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
            <Col>{'Credits: $' + auth.credits}</Col>
          </Row>
          <Col>
            <InputGroup className='mb-3 mt-3'>
              <InputGroup.Text id='basic-addon1'>$</InputGroup.Text>
              <Form.Control
                aria-label='addCredits'
                aria-describedby='basic-addon1'
                value={creditsToAdd}
                placeholder='Enter Credit Amount'
                onChange={(e) => setCreditsToAdd(e.target.value)}
              />
            </InputGroup>
            {clientSecret && (
              <Elements key={clientSecret} stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm clientSecret={clientSecret} onPaymentSuccess={handlePaymentSuccess} />
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
