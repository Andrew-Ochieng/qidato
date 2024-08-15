import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import { baseUrl } from '../api/baseUrl';

const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
    const [attendance, setAttendance] = useState([]);
    const { authTokens } = useContext(AuthContext);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/attendance/`, {
                    headers: {
                        Authorization: `Token ${authTokens}`,
                    },
                });
                setAttendance(response.data);
            } catch (error) {
                console.error("Error fetching attendance:", error);
            }
        };

        if (authTokens) {
            fetchAttendance();
        }
    }, [authTokens]);

    return (
        <AttendanceContext.Provider value={{ attendance }}>
            {children}
        </AttendanceContext.Provider>
    );
};

export default AttendanceContext;
