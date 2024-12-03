// File: src/api/userService.js

import apiClient from './ApiClient';

export const getUserProfile = () => apiClient.get('/user');

export const updateUserProfile = (userData) => apiClient.put('/user-profile', userData);

export const getAllUsers = () => apiClient.get('/users');
