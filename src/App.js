import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/DashBoard';
import MapView from './components/MapView';
import api from './services/api';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/dashboard')
        .then(() => setIsAuthenticated(true))
        .catch(() => {
          setIsAuthenticated(false);
          localStorage.removeItem('token');
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900">
      <Routes>
        <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Login setAuth={setIsAuthenticated} />} />
        <Route path="/map/:cardId" element={isAuthenticated ? <MapView /> : <Login setAuth={setIsAuthenticated} />} />
        <Route path="*" element={<div className="text-white text-center p-10">404 - Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;