import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:8000/dj-rest-auth/user/', {
                headers: { Authorization: `Token ${token}` }
            })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Token expired or invalid', error);
                // localStorage.removeItem('token');
            });
        }
    }, []);


    const register = async (username, email, password1, password2) => {
        try {
            const response = await axios.post('http://localhost:8000/dj-rest-auth/registration/', {
                username,
                email,
                password1,  // First password input
                password2   // Confirmation password input
            });
            
            console.log(response.data); // Check what the API returns

            // Assuming response.data contains the token and user details
            localStorage.setItem('token', response.data.key);
            setUser(response.data.user);

            navigate('/dashboard');
        } catch (error) {
            console.error('Registration failed', error.response.data);
        }
    };
    

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8000/dj-rest-auth/login/', { username, password });
            localStorage.setItem('token', response.data.key);
            setUser(response.data.user);
            // window.location.href = '/dashboard';
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed', error);
        }        
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:8000/dj-rest-auth/logout/', null, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` }
            });
            localStorage.removeItem('token');
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
