import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Card = ({ id, title, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:bg-indigo-50 transition-all cursor-pointer transform hover:-translate-y-2"
  >
    <h3 className="text-xl font-semibold text-indigo-800">{title}</h3>
    <p className="text-gray-500">ID: {id}</p>
  </div>
);

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/dashboard')
      .then((res) => setCards(res.data.cards))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load dashboard'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-10 bg-indigo-800 p-4 rounded-xl shadow-lg text-white">
        <h2 className="text-3xl font-bold">Explore India</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-6 py-2 rounded-full hover:bg-red-600 transition-all"
        >
          Logout
        </button>
      </header>
      {error ? (
        <p className="text-red-500 text-center bg-red-100 p-4 rounded-lg">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              onClick={() => navigate(`/map/${card.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;