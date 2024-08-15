import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const Register = () => {
    const { register } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isStudent, setIsStudent] = useState(false);
    const [isTeacher, setIsTeacher] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await register(username, email, password, isStudent, isTeacher);
            console.log(username)
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>
                        <input
                            type="checkbox"
                            checked={isStudent}
                            onChange={() => {
                                setIsStudent(!isStudent);
                                setIsTeacher(false);
                            }}
                        />
                        Student
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={isTeacher}
                            onChange={() => {
                                setIsTeacher(!isTeacher);
                                setIsStudent(false);
                            }}
                        />
                        Teacher
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <p>
                Already have an account? <a href="/">Login</a>
            </p>
        </div>
    );
};

export default Register;
