// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-peaz.onrender.com/api/v1', // Adjust the base URL to match your backend server
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
