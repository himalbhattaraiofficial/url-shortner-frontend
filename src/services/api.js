import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  // Sign up new user
  signup: async (username, email, password) => {
    const response = await api.post('/api/auth/signup', {
      username,
      email,
      password,
    });
    return response.data;
  },

  // Login user
  login: async (email, password) => {
    const response = await api.post('/api/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  // Get current user
  getMe: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  // Delete account
  deleteAccount: async (password) => {
    const response = await api.delete('/api/auth/account', {
      data: { password },
    });
    return response.data;
  },
};

// URL API
export const urlAPI = {
  // Get all URLs
  getUrls: async () => {
    const response = await api.get('/api/urls');
    return response.data;
  },

  // Get URL statistics
  getStats: async () => {
    const response = await api.get('/api/urls/stats');
    return response.data;
  },

  // Get single URL
  getUrl: async (id) => {
    const response = await api.get(`/api/urls/${id}`);
    return response.data;
  },

  // Create shortened URL
  createUrl: async (originalUrl, title = '', customCode = '') => {
    const response = await api.post('/api/urls', {
      originalUrl,
      title,
      customCode,
    });
    return response.data;
  },

  // Update URL
  updateUrl: async (id, data) => {
    const response = await api.put(`/api/urls/${id}`, data);
    return response.data;
  },

  // Delete URL
  deleteUrl: async (id) => {
    const response = await api.delete(`/api/urls/${id}`);
    return response.data;
  },
};

export default api;