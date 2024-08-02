import axios from "axios";

export const baseUrl = import.meta.env.VITE_BASEURL;
export const secretKey = import.meta.env.SECRET_KEY;

export const getMenu = ({ setMenu }) => {
  axios({
    method: "get",
    url: `https://menus-api.vercel.app`,
  })
    .then((response) => {
      setMenu(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log("ERROR: ", error);
    });
};

export const getCredits = ({ auth, setInformation }) => {
  axios({
    method: "get",
    url: `${baseUrl}/getCredits`,
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: auth.username,
      mongodbPassword: secretKey,
    }),
  })
    .then((response) => {
      console.log("RESPONSE: ", response);
    })
    .catch((error) => {
      console.log("ERROR: ", error);
    });
};

export const addCredits = ({ auth, creditsToAdd, setInformation }) => {
  axios({
    method: "put",
    url: `${baseUrl}/addCredits`,
    body: {
      username: auth.username,
      credits: creditsToAdd,
      mongodbPassword: secretKey,
    },
  })
    .then((response) => {
      console.log("RESPONSE: ", response);
    })
    .catch((error) => {
      console.log("ERROR: ", error);
    });
};

export const useCredits = ({ auth, creditsUsed, setInformation }) => {
  axios({
    method: "put",
    url: `${baseUrl}/useCredits`,
    body: {
      username: auth.username,
      credits: creditsUsed,
      mongodbPassword: secretKey,
    },
  })
    .then((response) => {
      console.log("RESPONSE: ", response);
    })
    .catch((error) => {
      console.log("ERROR: ", error);
    });
};
