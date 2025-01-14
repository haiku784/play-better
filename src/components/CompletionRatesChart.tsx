import React from 'react';
import { Line } from 'react-chartjs-2';

interface CompletionRatesChartProps {
    data: number[];
}

const CompletionRatesChart: React.FC<CompletionRatesChartProps> = ({ data }) => {
    const chartData = {
        labels: data.map((_, index) => `Session ${index + 1}`),
        datasets: [{
            label: 'Completion Rate',
            data,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
        }]
    };

    return <Line data={chartData} />;
};

export default CompletionRatesChart;