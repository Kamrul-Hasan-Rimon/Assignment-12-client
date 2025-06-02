// src/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://server-alpha-three.vercel.app',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.error('No token found in localStorage');
    return config;
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;