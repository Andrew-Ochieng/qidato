import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Line } from 'react-chartjs-2';
import publicAxios from '../../api/publicAxios';

const StudentDashboard = () => {
    const { token } = useContext(AuthContext);
    const [attendance, setAttendance] = useState([]);
    const [examResults, setExamResults] = useState([]);

    useEffect(() => {
        const fetchAttendance = async () => {
            const response = await publicAxios.get('/attendance/', {
                headers: { Authorization: `Token ${token}` },
            });
            setAttendance(response.data);
        };

        const fetchExamResults = async () => {
            const response = await publicAxios.get('/exams/results/', {
                headers: { Authorization: `Token ${token}` },
            });
            setExamResults(response.data);
        };

        fetchAttendance();
        fetchExamResults();
    }, [token]);

    const attendanceData = {
        labels: attendance.map(a => a.date),
        datasets: [
            {
                label: 'Attendance',
                data: attendance.map(a => a.present ? 1 : 0),
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    const examResultsData = {
        labels: examResults.map(r => r.exam.title),
        datasets: [
            {
                label: 'Exam Scores',
                data: examResults.map(r => r.score),
                fill: false,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
            },
        ],
    };

    return (
        <div className="container">
            <h2>Student Dashboard</h2>
            <div className="row">
                <div className="col-md-6">
                    <h3>Attendance</h3>
                    <Line data={attendanceData} />
                </div>
                <div className="col-md-6">
                    <h3>Exam Results</h3>
                    <Line data={examResultsData} />
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
