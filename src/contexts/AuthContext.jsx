import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is already logged in (from sessionStorage)
    return sessionStorage.getItem('isAuthenticated') === 'true';
  });

  const login = (username, password) => {
    // Authentication using environment variables
    // Note: In production, this should call a backend API
    // Environment variables are still visible in the browser, but not in source code
    const validUsername = import.meta.env.VITE_AUTH_USERNAME;
    const validPassword = import.meta.env.VITE_AUTH_PASSWORD;

    // Debug: Log environment variables (remove in production)
    console.log('Environment check:', {
      hasUsername: !!validUsername,
      hasPassword: !!validPassword,
      usernameValue: validUsername
    });

    // Check if environment variables are set
    if (!validUsername || !validPassword) {
      console.error('Authentication credentials not configured. Please set VITE_AUTH_USERNAME and VITE_AUTH_PASSWORD in .env.local');
      console.error('Current env values:', {
        VITE_AUTH_USERNAME: import.meta.env.VITE_AUTH_USERNAME,
        VITE_AUTH_PASSWORD: import.meta.env.VITE_AUTH_PASSWORD ? '***' : undefined
      });
      return false;
    }

    if (username === validUsername && password === validPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

