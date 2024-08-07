import React, { createContext, useState, useEffect } from 'react';
import { getUser } from './api';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [credits, setCredits] = useState(0)

  useEffect(() => {
    const checkUsername = localStorage.getItem("username");

    if (checkUsername) {
      setUsername(checkUsername);
    }
  }, []);


  const updateCredits = async () => {
    try {
        const data = await getUser({ auth: {username}, setInformation: setCredits });
        setCredits(data.message.credits)
    } catch (error) {
      console.error(error)
    }
    
  }

  const auth = {
    username: username,
    setUsername: setUsername,
    selectedLocation: selectedLocation,
    setSelectedLocation: setSelectedLocation,
    credits, 
    setCredits,
    updateCredits
  };

  return (
    <AuthContext.Provider value={{ auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
