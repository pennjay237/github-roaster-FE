import axios from 'axios';

// Remove /api from the URL since your backend doesn't have it
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'; // Changed from 'http://localhost:3001/api'

export const backendClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
backendClient.interceptors.request.use(
  (config) => {
    // You can add authentication tokens here if needed
    // Remove localStorage usage for SSR safety
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
backendClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error?.message || error.message || 'An error occurred';
    const enhancedError = new Error(message);
    
    // Add status code if available
    if (error.response?.status) {
      (enhancedError as any).status = error.response.status;
    }
    
    return Promise.reject(enhancedError);
  }
);