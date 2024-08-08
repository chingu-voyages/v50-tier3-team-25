import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import.meta.env.VITE_PAYMENT_COMPLETION_URL 

const CheckoutForm = ({ clientSecret, onPaymentSuccess }) => {

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const urL = import.meta.env.VITE_PAYMENT_COMPLETION_URL 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const paymentElement = elements.getElement(PaymentElement);
    if (!paymentElement) {
      setErrorMessage('Payment element is not mounted.');
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: urL,
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onPaymentSuccess();
    }

    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <PaymentElement />
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      <Button className="mb-4 mt-4" variant="primary" type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </Button>
    </Form>
  );
};

CheckoutForm.propTypes = {
  clientSecret: PropTypes.string.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
};

export default CheckoutForm;
