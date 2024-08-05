import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { InputGroup, Form } from 'react-bootstrap'
import { addCredits, createPaymentIntent } from './api'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckOutForm'
import { loadStripe } from '@stripe/stripe-js'

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
const stripePromise = loadStripe(stripeKey)

const Profile = ({ auth, credits, setView, updateCredits, setInformation }) => {
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
      await addCredits({ auth, creditsToAdd, setInformation })
      updateCredits()
    } catch (error) {
      console.error('Failed to add credits:', error)
    }
  }

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <Container>
          <Row>
            <Col>
              <h2>Profile</h2>
            </Col>
          </Row>
          <Row>
            <Col>{'Username: ' + auth.username}</Col>
          </Row>
          <Row>
            <Col>{'Credits: $' + credits}</Col>
          </Row>
          <Col>
            <InputGroup className='mb-3'>
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
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm clientSecret={clientSecret} onPaymentSuccess={handleAddCredits} />
              </Elements>
            )}
          </Col>
          <Row>
            <Col>
              <Button onClick={() => setView(false)}>OK</Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Profile
