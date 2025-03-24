import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import 'leaflet/dist/leaflet.css';

const ZoomControls = () => {
  const map = useMap();
  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      <button
        onClick={() => map.zoomIn()}
        className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-all"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
      <button
        onClick={() => map.zoomOut()}
        className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-all"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
        </svg>
      </button>
    </div>
  );
};

const MapView = () => {
  const { cardId } = useParams();
  const [mapData, setMapData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/map/${cardId}`)
      .then((res) => setMapData(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load map'));
  }, [cardId]);

  return (
    <div className="relative min-h-screen">
      {error ? (
        <div className="flex items-center justify-center h-screen text-red-500 bg-red-100 p-4 rounded-lg">
          {error}
        </div>
      ) : !mapData ? (
        <div className="flex items-center justify-center h-screen text-gray-600">Loading...</div>
      ) : (
        <MapContainer
          center={[20.5937, 78.9629]} // Center of India
          zoom={5}
          style={{ height: '100vh', width: '100%' }}
          className="rounded-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <ZoomControls />
          <div className="absolute top-4 left-4 bg-white p-4 rounded-xl shadow-lg z-[1000]">
            <h3 className="text-lg font-semibold text-indigo-800">Location: {mapData.cardId}</h3>
          </div>
        </MapContainer>
      )}
    </div>
  );
};

export default MapView;