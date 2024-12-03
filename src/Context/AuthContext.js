import React, { createContext, useState, useEffect } from 'react';
import { getUserProfile } from '../Api/UserService';
import { logout as apiLogout } from '../Api/AuthService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem('accessToken');
        return {
            user: null,
            isAuthenticated: !!token, // Initialize based on token presence
        };
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setAuth({ user: null, isAuthenticated: false });
                return;
            }

            try {
                const { data } = await getUserProfile();
                setAuth({ user: data, isAuthenticated: true });
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setAuth({ user: null, isAuthenticated: false });
            }
        };

        fetchUserProfile(); // Rebuild the state when the app loads
    }, []);

    const logout = async () => {
        try {
            await apiLogout();
            localStorage.removeItem('accessToken');
            setAuth({ user: null, isAuthenticated: false });
            window.location.href = '/';
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
