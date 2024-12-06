// File: src/api/apiClient.js

import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});


apiClient.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');

                const { data } = await axios.post(
                    'http://localhost:8080/auth/token',
                    {
                        token: refreshToken
                    },
                    { withCredentials: true }
                );

                localStorage.setItem('accessToken', data.accessToken);
                originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

                return apiClient(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');

                return refreshError;
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;