import axios from "axios";

export const baseUrl = import.meta.env.VITE_BASEURL;
export const secretKey = import.meta.env.VITE_SECRET_KEY;

export const saveUsername = ({ auth, username }) => {
  auth.setUsername(username);
  localStorage.setItem("username", username);
};

export const getMenu = ({ setMenu }) => {
  axios({
    method: "get",
    url: `https://menus-api.vercel.app`,
  })
    .then((response) => {
      setMenu(response.data);
    })
    .catch((error) => {
      console.log("ERROR: ", error);
    });
};

export const getUser = async ({ auth, setInformation }) => {
  if (!auth.username) {
    return;
  }

  try {
    const response = await fetch(`${baseUrl}/getUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: auth.username,
        mongodbPassword: secretKey,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setInformation(data.message.credits)
      return data;
    } else {
      console.error(response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const addCredits = async ({ auth, creditsToAdd, setInformation }) => {
  try {
    creditsToAdd = parseFloat(creditsToAdd)

    if (creditsToAdd === NaN) {
      creditsToAdd = 0
    }
    
    const response = await axios.put(`${baseUrl}/addCredits`, {
      username: auth.username,
      credits: creditsToAdd,
      mongodbPassword: secretKey,
    });
    console.log("RESPONSE: ", response);
    return response.data;
  } catch (error) {
    console.log("ERROR: ", error);
    throw error;
  }
};

export const useCredits = async ({ auth, creditsUsed, setInformation }) => {
  try {
    const response = await axios.put(`${baseUrl}/useCredits`, {
      username: auth.username,
      credits: parseFloat(creditsUsed),
      mongodbPassword: secretKey,
    });
    console.log("RESPONSE: ", response);
    return response.data;
  } catch (error) {
    console.log("ERROR: ", error);
    throw error;
  }
};

export const createPaymentIntent = async (amount) => {
  const stripeSecretKey = import.meta.env.VITE_STRIPE_SECRET_KEY;

  if (!Number.isInteger(amount) || amount <= 0) {
    throw new error("Amount is less than 0")

  }

  try {
    const response = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${stripeSecretKey}`,
      },
      body: new URLSearchParams({
        amount: amount.toString(),
        currency: 'usd',
        'payment_method_types[]': 'card',
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error creating payment intent:', errorResponse);
      throw new Error('Failed to create payment intent');
    }

    const paymentIntent = await response.json();
    return paymentIntent.client_secret;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};
