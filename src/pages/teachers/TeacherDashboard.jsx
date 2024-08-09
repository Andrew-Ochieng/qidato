import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Bar, Pie } from 'react-chartjs-2';
import publicAxios from '../../api/publicAxios';

const TeacherDashboard = () => {
    const { token } = useContext(AuthContext);
    const [attendance, setAttendance] = useState([]);
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const fetchAttendance = async () => {
            const response = await publicAxios.get('/attendance/', {
                headers: { Authorization: `Token ${token}` },
            });
            setAttendance(response.data);
        };

        const fetchExams = async () => {
            const response = await publicAxios.get('/exams/', {
                headers: { Authorization: `Token ${token}` },
            });
            setExams(response.data);
        };

        fetchAttendance();
        fetchExams();
    }, [token]);

    const attendanceData = {
        labels: attendance.map(a => a.date),
        datasets: [
            {
                label: 'Attendance',
                data: attendance.map(a => a.present ? 1 : 0),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const examData = {
        labels: exams.map(e => e.title),
        datasets: [
            {
                label: 'Exam Scores',
                data: exams.map(e => e.average_score),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
        ],
    };

    return (
        <div className="container">
            <h2>Teacher Dashboard</h2>
            <div className="row">
                <div className="col-md-6">
                    <h3>Attendance</h3>
                    <Bar data={attendanceData} />
                </div>
                <div className="col-md-6">
                    <h3>Exam Scores</h3>
                    <Pie data={examData} />
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
