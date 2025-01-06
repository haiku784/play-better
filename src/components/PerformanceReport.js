import React from 'react';
import GraphComponent from './GraphComponent';
import TableComponent from './TableComponent';
import './PerformanceReport.css';

/**
 * PerformanceReport component to display performance metrics in a user-friendly manner.
 * It includes a graph and a table to represent different aspects of the metrics.
 */
const PerformanceReport = ({ metrics }) => {
    return (
        <div className="performance-report">
            <h1>Performance Report</h1>
            <GraphComponent data={metrics.graphData} />
            <TableComponent data={metrics.tableData} />
        </div>
    );
};

export default PerformanceReport;