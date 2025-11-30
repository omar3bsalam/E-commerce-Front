import axios from 'axios';

const API_BASE = 'http://localhost:5003/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me')
};

export const productsAPI = {
  getAll: (filters = {}) => api.get('/products', { params: filters }),
  getById: (id) => api.get(`/products/${id}`),
  getByCategory: (category, params = {}) => api.get(`/products/category/${category}`, { params })
};

export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  
  getCart: () => api.get('/users/cart'),
  addToCart: (data) => api.post('/users/cart', data),
  updateCart: (productId, quantity) => api.put(`/users/cart/${productId}`, { quantity }),
  removeFromCart: (productId) => api.delete(`/users/cart/${productId}`),
  clearCart: () => api.delete('/users/cart'),
  getCartSummary: () => api.get('/users/cart/summary'),
  
  getWishlist: () => api.get('/users/wishlist'),
  addToWishlist: (productId) => api.post('/users/wishlist', { productId }),
  removeFromWishlist: (productId) => api.delete(`/users/wishlist/${productId}`)
};

export const ordersAPI = {
  create: (orderData) => api.post('/orders', orderData),
  getUserOrders: (params = {}) => api.get('/orders', { params }),
  getOrder: (id) => api.get(`/orders/${id}`),
  cancelOrder: (id) => api.put(`/orders/${id}/cancel`)
};

export const testConnection = async () => {
  try {
    const response = await api.get('/health');
    console.log(' Backend connection successful');
    return true;
  } catch (error) {
    console.error(' Cannot connect to backend');
    return false;
  }
};

export const testAuth = async () => {
  try {
    await api.get('/users/profile');
    console.log(' Authentication successful');
    return true;
  } catch (error) {
    console.error(' Authentication failed');
    return false;
  }
};




export default api;