import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import DashboardRedirect from './components/DashbaoardRedirect';
import TeacherDashboard from './pages/teachers/TeacherDashboard';
import StudentDashboard from './pages/students/StudentDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/auth/Register';

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard-redirect" element={<DashboardRedirect />} />
                <Route path="/teachers/dashboard" element={<TeacherDashboard />} />
                <Route path="/students/dashboard" element={<StudentDashboard />} />
            </Routes>
        </div>
    );
};

export default App;
