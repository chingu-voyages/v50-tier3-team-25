import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

const CheckoutForm = ({ clientSecret, onPaymentSuccess }) => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:8080/payment-completion'
      }
    })
    if (error) {
      console.log(error.message)
    } else {
      alert('Payment Successful!')
      onPaymentSuccess()
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button className='mb-4 mt-4' variant='primary' type='submit' disabled={!stripe}>
        Pay
      </Button>
    </Form>
  )
}
export default CheckoutForm
