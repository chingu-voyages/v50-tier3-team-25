import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState([]);
  const [username, setUsername] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const checkAccess = localStorage.getItem("access");
    const checkUsername = localStorage.getItem("username");

    if (checkAccess && checkUsername) {
      setAccessToken(checkAccess);
    }
  }, []);

  const auth = {
    accessToken: accessToken,
    setAccessToken: setAccessToken,
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
