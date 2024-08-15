import React from 'react';
import StudentAttendance from './sections/StudentAttendance';
import { Navbar } from '../../components/Navbar';
import StudentPerformance from './sections/StudentPerfomance';

const StudentDashboard = () => {
   
   
    return (
        <div >
          <Navbar />
          <div className="container-xxl pb-5">
            <StudentPerformance />
            <StudentAttendance />
          </div>
        </div>
    );
};

export default StudentDashboard;
