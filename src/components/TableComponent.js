import React from 'react';
import PropTypes from 'prop-types';
import './TableComponent.css';

/**
 * TableComponent displays performance metrics in a tabular format.
 * It provides clarity and ease of understanding for the report details.
 */
const TableComponent = ({ data }) => {
    return (
        <table className="metrics-table">
            <thead>
                <tr>
                    <th>Metric</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {data.map((metric, index) => (
                    <tr key={index}>
                        <td>{metric.name}</td>
                        <td>{metric.value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

TableComponent.propTypes = {
    data: PropTypes.array.isRequired,
};

export default TableComponent;