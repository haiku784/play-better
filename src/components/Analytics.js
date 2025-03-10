import React, { useEffect, useState } from 'react';
import './Analytics.css'; // Importing CSS for styling

/**
 * Analytics component to display health data trends and reports.
 * Fetches data from the Analytics Service and presents it in a user-friendly format.
 */
const Analytics = () => {
    const [healthData, setHealthData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:5000/analytics'; // Replace with your API URL

    /**
     * Fetch health data from the Analytics Service.
     */
    const fetchHealthData = async () => {
        try {
            const response = await fetch(`${API_URL}/data`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setHealthData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHealthData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="analytics-container">
            <h1>Health Data Trends</h1>
            <table className="analytics-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Health Metric</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {healthData.map((dataPoint) => (
                        <tr key={dataPoint.date}>
                            <td>{dataPoint.date}</td>
                            <td>{dataPoint.metric}</td>
                            <td>{dataPoint.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Analytics;