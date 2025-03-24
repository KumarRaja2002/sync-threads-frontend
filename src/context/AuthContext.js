import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('AuthContext: Token=', token);
    if (token) {
      setIsAuthenticated(true);
      navigate('/dashboard');
    } else {
      setIsAuthenticated(false);
      navigate('/login');
    }
    setLoading(false);
  }, [navigate]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log('AuthContext: isAuthenticated=', isAuthenticated);
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};