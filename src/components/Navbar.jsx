
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    
    console.log(user)
  return (
    <nav class="navbar navbar-expand-lg bg-info">
        <div class="container-fluid">
            <Link to='/' class="navbar-brand">Home</Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
            </ul>
            </div>

            {user ? (
                <div className='d-flex gap-2 align-items-center'>
                    <div>
                        Hello {user.username}
                    </div>
                    <button onClick={logout} className='btn btn-danger'>Logout</button>
                </div>
            ) : (
                <div className='d-flex gap-2'>
                    <Link to='/login' className='btn btn-xs btn-success md-block hidden'>
                        Login
                    </Link>
                    <Link to='/register' className='btn btn-success md-block hidden'>
                        Register
                    </Link>
                </div>
            )}
        </div>
    </nav>
  )
}
