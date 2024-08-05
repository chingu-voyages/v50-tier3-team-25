import React, { useEffect, useState } from 'react'
import { Container, Col, Row, Card, Form } from 'react-bootstrap'
import { getCart } from './utility'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckOutForm'
import { createPaymentIntent, addCredits } from './api'

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
const stripePromise = loadStripe(stripeKey)

const Checkout = ({ credits }) => {
  const [useCredits, setUseCredits] = useState('')
  const [cart, setCart] = useState([])
  const [clientSecret, setClientSecret] = useState('')
  const [subtotal, setSubtotal] = useState(0)
  const [taxes, setTaxes] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const cartData = getCart()
    setCart(cartData)

    const calculatedSubtotal = Object.keys(cartData).reduce((acc, id) => {
      const item = cartData[id]
      return acc + item.price * item.quantity
    }, 0)

    const taxRate = 0.08
    const calculatedTaxes = calculatedSubtotal * taxRate
    const calculatedTotal = calculatedSubtotal + calculatedTaxes
    const totalAmount = Math.round(calculatedTotal * 100)

    setSubtotal(calculatedSubtotal)
    setTaxes(calculatedTaxes)
    setTotal(calculatedTotal)

    // fetch stripe secret
    const fetchClientSecret = async () => {
      try {
        const clientSecret = await createPaymentIntent(totalAmount)
        setClientSecret(clientSecret)
      } catch (error) {
        console.error('Error fetching client secret:', error)
      }
    }

    fetchClientSecret()
  }, [])

  const appearance = {
    theme: 'stripe'
  }

  const options = {
    clientSecret,
    appearance
  }

  return (
    <Container>
      <Row className=''>
        <Row className=' mb-3 mt-2'>
          <Col>
            <Link variant='primary' to='/menu'> Return To Menu</Link>
          </Col>
        </Row>
        <Col>
          <h6>Billing information</h6>
          <Form onSubmit=''>
            <Form.Group controlId='formBasicUsername'>
              <Form.Label />
              <Form.Control
                type='text'
                placeholder='Enter Name'
                name='userName'
                value=''
                onChange=''
              />
            </Form.Group>

            <Form.Group controlId='formBasicEmail'>
              <Form.Label />
              <Form.Control
                type='address'
                placeholder='Address'
                name='address'
                value=''
                onChange=''
              />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label />
              <Form.Control
                type='text'
                placeholder='City'
                name='city'
                value=''
                onChange=''
              />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label />
              <Form.Control
                type='text'
                placeholder='State'
                name='state'
                value=''
                onChange=''
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label />
              <Form.Control
                type='text'
                placeholder='ZipCode'
                name='state'
                value=''
                onChange=''
              />
            </Form.Group>

          </Form>

          <h6 className='mb-3'>Payments</h6>
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
              <h6 className='mb-3'>Order Summary</h6>
              {Object.keys(cart).map((id) => {
                const item = cart[id]

                return (
                  <div
                    key={uuidv4()}
                    style={{ liststyle: 'none' }}
                    className='list-unstyled'
                  >
                    <li className='list-unstyled pr-5' />
                    <span>{item.name}</span>
                    <span> - x{item.quantity} - </span>
                    <span> ${item.price * item.quantity}</span>
                  </div>
                )
              })}
              <hr />
              <p>Subtotal: ${subtotal.toFixed(2)} </p>
              <p>{'Credit: $' + credits}</p>
              <p>Taxes:  ${taxes.toFixed(2)} </p>
              <p>Total: ${total.toFixed(2)} </p>
            </Card.Body>
          </Card>

        </Col>
      </Row>
    </Container>
  )
}

export default Checkout
