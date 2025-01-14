import React from 'react';
import { Bar } from 'react-chartjs-2';

interface KillDeathRatioChartProps {
    data: number[];
}

const KillDeathRatioChart: React.FC<KillDeathRatioChartProps> = ({ data }) => {
    const chartData = {
        labels: data.map((_, index) => `Session ${index + 1}`),
        datasets: [{
            label: 'Kill/Death Ratio',
            data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }]
    };

    return <Bar data={chartData} />;
};

export default KillDeathRatioChart;