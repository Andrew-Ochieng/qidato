import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import GradesProvider from './context/GradesContext.jsx'
import AttendanceProvider from './context/AttendanceContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GradesProvider>
          <AttendanceProvider>
            <App />
          </AttendanceProvider>
        </GradesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
