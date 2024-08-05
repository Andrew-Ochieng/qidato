import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GradesContext = createContext();

const GradesProvider = ({ children }) => {
    const [grades, setGrades] = useState([]);
    const [loadingGrades, setLoadingGrades] = useState(true);
    const [errorGrades, setErrorGrades] = useState(null);

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/grades/', {
                    headers: { Authorization: `Token ${localStorage.getItem('token')}` }
                });
                setGrades(response.data);
            } catch (error) {
                setErrorGrades(error.message || "Failed to fetch grades");
            } finally {
                setLoadingGrades(false);
            }
        };
        fetchGrades();
        
    }, []);

    const gradeData = {
        labels: grades.map(grade => grade.subject),
        datasets: [
            {
                label: 'Grades',
                data: grades.map(grade => grade.score),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            }
        ]
    };

    return (
        <GradesContext.Provider value={{ gradeData, loadingGrades, errorGrades }}>
            {children}
        </GradesContext.Provider>
    );
};

export default GradesProvider;

