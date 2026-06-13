/**
 * API CLIENT UTILITY
 * 
 * Centralise toutes les requêtes au backend
 * Gère les headers, token JWT, erreurs
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (includeAuth) {
    const token = localStorage.getItem('authToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Une erreur est survenue');
  }

  return data;
};

export const apiClient = {
  // AUTH
  register: (email, password, passwordConfirm, firstName, lastName) =>
    fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ email, password, passwordConfirm, firstName, lastName })
    }).then(handleResponse),

  login: (email, password) =>
    fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ email, password })
    }).then(handleResponse),

  getCurrentUser: () =>
    fetch(`${API_URL}/api/auth/me`, {
      headers: getHeaders(true)
    }).then(handleResponse),

  // PRODUCTS
  getProducts: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return fetch(`${API_URL}/api/products?${params}`)
      .then(handleResponse);
  },

  getProduct: (id) =>
    fetch(`${API_URL}/api/products/${id}`)
      .then(handleResponse),

  searchProducts: (query) =>
    fetch(`${API_URL}/api/products/search?q=${encodeURIComponent(query)}`)
      .then(handleResponse),

  // ORDERS
  getOrders: () =>
    fetch(`${API_URL}/api/orders`, {
      headers: getHeaders(true)
    }).then(handleResponse),

  getOrder: (id) =>
    fetch(`${API_URL}/api/orders/${id}`, {
      headers: getHeaders(true)
    }).then(handleResponse),

  createOrder: (orderData) =>
    fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(orderData)
    }).then(handleResponse),

  createStripeCheckoutSession: (payload) =>
    fetch(`${API_URL}/api/payments/stripe/checkout-session`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(payload)
    }).then(handleResponse),

  confirmStripeOrder: (orderId, sessionId) =>
    fetch(`${API_URL}/api/payments/stripe/confirm`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify({ orderId, sessionId })
    }).then(handleResponse),

  sendContactMessage: (payload) =>
    fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(payload)
    }).then(handleResponse),

  // ADMIN
  getAdminStats: () =>
    fetch(`${API_URL}/api/admin/stats`, {
      headers: getHeaders(true)
    }).then(handleResponse),

  getAdminProducts: () =>
    fetch(`${API_URL}/api/admin/products`, {
      headers: getHeaders(true)
    }).then(handleResponse),

  createProduct: (productData) =>
    fetch(`${API_URL}/api/admin/products`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(productData)
    }).then(handleResponse),

  updateProduct: (id, productData) =>
    fetch(`${API_URL}/api/admin/products/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(productData)
    }).then(handleResponse),

  deleteProduct: (id) =>
    fetch(`${API_URL}/api/admin/products/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    }).then(handleResponse),

  getAdminOrders: () =>
    fetch(`${API_URL}/api/admin/orders`, {
      headers: getHeaders(true)
    }).then(handleResponse),

  updateOrderStatus: (id, statusData) =>
    fetch(`${API_URL}/api/admin/orders/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(statusData)
    }).then(handleResponse)
};
