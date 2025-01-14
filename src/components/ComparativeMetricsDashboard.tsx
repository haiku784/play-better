import React, { useState, useEffect } from 'react';

const ComparativeMetricsDashboard = ({ metrics }) => {
    return (
        <div>
            <h2>Comparative Metrics</h2>
            <table>
                <thead>
                    <tr>
                        <th>Session ID</th>
                        <th>Kill/Death Ratio</th>
                        <th>Completion Rate</th>
                        <th>Movement Pattern</th>
                    </tr>
                </thead>
                <tbody>
                    {metrics.map(metric => (
                        <tr key={metric.session_id}>
                            <td>{metric.session_id}</td>
                            <td>{metric.kill_death_ratio}</td>
                            <td>{metric.completion_rate}</td>
                            <td>{metric.movement_pattern}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ComparativeMetricsDashboard;