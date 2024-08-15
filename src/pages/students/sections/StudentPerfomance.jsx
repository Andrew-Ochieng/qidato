import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PerformanceContext from "../../../context/PerfomanceContext"

const StudentPerformance = () => {
    const { results } = useContext(PerformanceContext);

    if (!results) {
        return <div>Loading...</div>;
    }

    const data = results.map(result => ({
        subject: result.subject.title,
        score: result.score
    }));

    return (
        <div className="container mt-4">
            <h4 className='text-center mb-4'>Student Performance</h4>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="subject" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="score" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default StudentPerformance;
