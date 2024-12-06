import apiClient from './ApiClient';

export const login = (credentials) => apiClient.post('/auth/login', credentials);

export const register = (userData) => apiClient.post('/register', userData);

export const logout = async () => await apiClient.post('/auth/logout');

export const refreshToken = (token) => apiClient.post('/auth/token', { token }); // send the refresh token