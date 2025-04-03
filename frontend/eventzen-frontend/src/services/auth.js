// src/services/auth.js
import api from './api';

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  return { token, role };
};