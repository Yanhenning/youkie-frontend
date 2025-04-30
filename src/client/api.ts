import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Get base URL based on environment
const getBaseUrl = (): string => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_API_URL || 'https://api.youkie.com'; // TBD for production
  }
  return 'http://127.0.0.1:8000'; // Local environment
};

// Default config for axios instance
const config: AxiosRequestConfig = {
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create axios instance with config
const api: AxiosInstance = axios.create(config);

// Add request interceptor for auth tokens, etc.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors (e.g., 401 unauthorized, 403 forbidden, etc.)
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
      // For example: redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
