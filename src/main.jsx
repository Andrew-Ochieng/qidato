import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { AttendanceProvider } from './context/AttendanceContext.jsx'
import { PerformanceProvider } from './context/PerfomanceContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AttendanceProvider>
          <PerformanceProvider>
            <App />
          </PerformanceProvider>
        </AttendanceProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
