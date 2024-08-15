import React, { useContext } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AttendanceContext from "../../../context/AttendanceContext"

const StudentAttendance = () => {
    const { attendance } = useContext(AttendanceContext);

    // Calculate the counts of present and absent days
    const presentCount = attendance.filter(a => a.status === 'Present').length;
    const absentCount = attendance.filter(a => a.status === 'Absent').length;

    const attendanceData = [
        { name: 'Present', value: presentCount },
        { name: 'Absent', value: absentCount }
    ];

    const COLORS = ['#58D68D', '#F4D03F'];

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h4 className='text-center mb-4'>Attendance</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={attendanceData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {attendanceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default StudentAttendance; 
