import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import { baseUrl } from '../api/baseUrl';

const PerformanceContext = createContext();

export const PerformanceProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const { authTokens } = useContext(AuthContext);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/result/`, {
                    headers: {
                        Authorization: `Token ${authTokens}`,
                    },
                });
                setResults(response.data);
            } catch (error) {
                console.error("Error fetching results:", error);
            }
        };

        const fetchSubjects = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/subject/`, {
                    headers: {
                        Authorization: `Token ${authTokens}`,
                    },
                });
                setSubjects(response.data);
            } catch (error) {
                console.error("Error fetching subjects:", error);
            }
        };

        if (authTokens) {
            fetchResults();
            fetchSubjects();
        }
    }, [authTokens]);

    return (
        <PerformanceContext.Provider value={{ results, subjects }}>
            {children}
        </PerformanceContext.Provider>
    );
};

export default PerformanceContext;
