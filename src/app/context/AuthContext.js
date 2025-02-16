"use client";
import React, { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  auth: () => {},
  userAuth: {},
  setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }) => {
  console.log("AuthProvider");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [userAuth, setUserAuth] = useState({});

  const auth = (userData) => {
    setIsAuthenticated(true);
    setUserAuth(userData);
  };

  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, auth, userAuth, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
