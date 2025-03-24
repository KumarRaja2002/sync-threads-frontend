import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Router at the root
import './index.css';
import App from './App';

console.log('Index.js: Mounting app');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router> {/* Router wraps everything */}
      <App />
    </Router>
  </React.StrictMode>
);