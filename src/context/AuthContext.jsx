import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../api/baseUrl';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
    const [authTokens, setAuthTokens] = useState(() => JSON.parse(localStorage.getItem('authTokens')) || null);
    const navigate = useNavigate();


    useEffect(() => {
        if (authTokens !== null) {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const storedTokens = JSON.parse(localStorage.getItem('authTokens'));
            if (storedUser && storedTokens) {
                setUser(storedUser);
                setAuthTokens(storedTokens);
                if (storedUser.role === 'student' ) {
                    navigate('/student/dashboard');
                } else if (storedUser.role === 'teacher' ) {
                    navigate('/teacher/dashboard');
                } else {
                    navigate('/');
                }
            }
            
            // console.log(storedUser.role)
        } 

        if (authTokens) {
            axios.defaults.headers.common['Authorization'] = `Token ${authTokens}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [authTokens, navigate]);


    const register = async (username, email, password, isStudent, isTeacher) => {
        try {
            const role = isStudent ? 'student' : isTeacher ? 'teacher' : '';
            const response = await axios.post(`${baseUrl}/auth/register/`, {
                username,
                email,
                password,
                role,
            });
            setUser(response.data);
            navigate('/');
        } catch (error) {
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${baseUrl}/auth/login/`, {
                username: email,
                password
            });
            setAuthTokens(response.data.token);
            setUser(response.data);

            localStorage.setItem('authTokens', JSON.stringify(response.data.token));
            localStorage.setItem('user', JSON.stringify(response.data))
            if (response.data.role === 'student' ) {
                navigate('/student/dashboard');
            } 
            if (response.data.role === 'teacher' ) {
                navigate('/teacher/dashboard');
            }
        } catch (error) {
            throw error;
        }
    };


    const logout = async () => {
        try {
            await axios.post(`${baseUrl}/auth/logout/`, null, {
                headers: {
                    'Authorization': `Token ${authTokens}`
                }
            });
            setAuthTokens(null);
            setUser(null);
            localStorage.removeItem('authTokens');
            navigate('/');
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, authTokens, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
