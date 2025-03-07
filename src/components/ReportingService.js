import React, { useEffect, useState } from 'react';
import './ReportingService.css';

/**
 * ReportingService component fetches and displays reports for the user.
 * It handles data fetching, state management, and rendering of reports.
 */
const ReportingService = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Fetch reports from the Reporting Service API.
     * This function is called on component mount.
     */
    const fetchReports = async () => {
        try {
            const response = await fetch('/reports');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setReports(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    /**
     * Renders the report list or error/loading state.
     */
    return (
        <div className="reporting-service">
            <h1>User Reports</h1>
            {loading && <p>Loading reports...</p>}
            {error && <p className="error">Error: {error}</p>}
            <ul className="report-list">
                {reports.map(report => (
                    <li key={report.reportId} className="report-item">
                        <h2>Report ID: {report.reportId}</h2>
                        <p>{report.content}</p>
                        <p><strong>Generated on:</strong> {new Date(report.timestamp).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReportingService;