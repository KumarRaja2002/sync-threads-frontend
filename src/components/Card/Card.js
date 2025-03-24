import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ id, title }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/map/${id}`)}
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-500">ID: {id}</p>
    </div>
  );
};

export default Card;