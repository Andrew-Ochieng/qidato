import React, { useContext } from 'react';
import { GradesContext } from '../../context/GradesContext';
import { AttendanceContext } from '../../context/AttendanceContext';
import { Bar, Line, Pie } from 'react-chartjs-2';

// Import and register Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,  // Import PointElement
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,   // Register LineElement
  PointElement,  // Register PointElement
  Title,
  Tooltip,
  Legend
);

export const Dashboard = () => {
  const { gradeData, loadingGrades, errorGrades } = useContext(GradesContext);
  const { attendanceData } = useContext(AttendanceContext);
  
  if (loadingGrades) return <div>Loading...</div>;
  if (errorGrades) return <div>Error: {errorGrades}</div>;


  return (
    <section className='container-fluid py-5'>
      <div>Student Dashboard</div>
      <div className='row '>
        <div className='col-md-6'>
          <h2>Grade Distribution</h2>
          <Bar data={gradeData} />
        </div>
        <div className='col-md-6'>
          <h2>Attendance Tracking</h2>
          <Line data={attendanceData} />
        </div>
    </div>
    </section>
  );
};
