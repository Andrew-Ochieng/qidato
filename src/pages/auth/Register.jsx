import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const Register = () => {
    const { register } = useContext(AuthContext);
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(username, email, password1, password2);
    };

    return (
        <div className='container py-5'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group mt-3">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password1} onChange={(e) => setPassword1(e.target.value)} />
                </div>
                <div className="form-group mt-3">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Register</button>
            </form>
        </div>
    );
};
