import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

export const Navbar = () => {
    const { logout, user } = useContext(AuthContext);
    return (
        <nav className="navbar navbar-expand-lg bg-info">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Home</Link>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Exams</a>
                        </li>
                    </ul>
                </div>

                {user ? (
                    <div className="d-flex gap-2 align-items-center">
                        <div>
                            Hello {user.username}
                        </div>
                        <button onClick={logout} className="btn btn-danger">Logout</button>
                    </div>
                ) : <>hello</>}
            </div>
        </nav>
    );
};
