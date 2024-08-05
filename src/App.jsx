import { Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from './components/Navbar'
import { Landing } from './pages/landing/Landing';
import { Login }   from './pages/auth/Login';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Suspense } from 'react';
import { Register } from './pages/auth/Register';

function App() {
 
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Landing /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/dashboard' element={ <Dashboard /> } />
      </Routes>
    </Suspense>
  )
}

export default App
