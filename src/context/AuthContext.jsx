// src/context/AuthContext.js
import React, { createContext, useState } from 'react';
import publicAxios from '../api/publicAxios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const login = async (email, password) => {
        try {
            const response = await publicAxios.post('/auth/token/login/', { email, password });
            const { auth_token } = response.data;
            setToken(auth_token);
            localStorage.setItem('token', auth_token);
            await getUser();
        } catch (error) {
            console.error("Login failed:", error.response?.data);
        }
    };

    const register = async (email, password) => {
        try {
            await publicAxios.post('/auth/users/', { email, password });
            await login(email, password); // Automatically log in after registration
        } catch (error) {
            console.error('Registration failed:', error.response?.data);
            throw error; // Re-throw to be handled in the component
        }
    };

    const getUser = async () => {
        if (token) {
            try {
                const response = await publicAxios.get('/auth/users/me/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Fetching user failed:", error.response?.data);
            }
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        publicAxios.post('/auth/token/logout/', {}, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
