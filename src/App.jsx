import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import TeacherDashboard from './pages/teachers/TeacherDashboard';
import StudentDashboard from './pages/students/StudentDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/auth/Register';
import AuthContext from './context/AuthContext';

const App = () => {
    // const { user } = useContext(AuthContext);
    
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
                <Route path="/student/dashboard" element={<StudentDashboard />} />
            </Routes>
        </div>
    );
};

export default App;
