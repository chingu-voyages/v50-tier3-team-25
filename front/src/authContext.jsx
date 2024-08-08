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

    const storedCredits = localStorage.getItem('credits');

    if (storedCredits) {
    setCredits(Number(storedCredits))
  }
  }, []);

  


  const updateCredits = async () => {
    try {
      console.log("update credits for user:", username); 
        const data = await getUser({ auth: {username}, setInformation: setCredits });
        if (data && data.message && data.message.credits !== undefined) {
          setCredits(data.message.credits)
          localStorage.setItem('credits', data.message.credits)
          console.log("updated credits: ", data.message.credits)
        } else {
          console.error("no credits added: ", data)
        }
        
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
