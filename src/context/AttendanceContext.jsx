import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AttendanceContext = createContext();

const AttendanceProvider = ({ children }) => {
    const [attendance, setAttendance] = useState([]);
    const [loadingAttendance, setLoadingAttendance] = useState(true);
    const [errorAttendance, setErrorAttendance] = useState(null);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/attendance/', {
                    headers: { Authorization: `Token ${localStorage.getItem('token')}` }
                });
                setAttendance(response.data);
            } catch (error) {
                setErrorAttendance(error.message || "Failed to fetch attendance");
            } finally {
                setLoadingAttendance(false);
            }
        };
        fetchAttendance();
    }, []);

    const attendanceData = {
        labels: attendance.map(record => record.date),
        datasets: [
            {
                label: 'Attendance',
                data: attendance.map(record => (record.status === 'Present' ? 1 : 0)),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            }
        ]
    };



    return (
        <AttendanceContext.Provider value={{ attendanceData, loadingAttendance, errorAttendance }}>
            {children}
        </AttendanceContext.Provider>
    );
};

export default AttendanceProvider;

