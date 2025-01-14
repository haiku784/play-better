import React from 'react';

interface MetricTableProps {
  metrics: any[];
}

export const MetricTable: React.FC<MetricTableProps> = ({ metrics }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Configuration</th>
          <th>Metric</th>
        </tr>
      </thead>
      <tbody>
        {metrics.map((metric, index) => (
          <tr key={index}>
            <td>{metric.configuration}</td>
            <td>{metric.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};