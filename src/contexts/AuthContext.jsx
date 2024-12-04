// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [roles, setRoles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedRoles = localStorage.getItem('rol');
    if (savedToken && savedRoles) {
      setToken(JSON.parse(savedToken));
      setRoles(atob(savedRoles));
    }
    setIsLoading(false);
  }, []);

  const saveToken = (newToken) => {
    localStorage.setItem('token', JSON.stringify(newToken));
    setToken(newToken);
  };

  const saveRoles = (newRoles) => {
    localStorage.setItem('rol', btoa(JSON.stringify(newRoles)));
    setRoles(newRoles);
  }



  const removeData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    setToken(null);
    setRoles(null);
  };



  return (
    <AuthContext.Provider value={{ token, saveToken, removeData, isLoading, saveRoles, roles }}>
      {children}
    </AuthContext.Provider>
  )
};

export { AuthContext, AuthProvider };
