import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const checkUsername = localStorage.getItem("username");

    if (checkUsername) {
      setUsername(checkUsername);
    }
  }, []);

  const auth = {
    username: username,
    setUsername: setUsername,
    selectedLocation: selectedLocation,
    setSelectedLocation: setSelectedLocation,
  };

  return (
    <AuthContext.Provider value={{ auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
