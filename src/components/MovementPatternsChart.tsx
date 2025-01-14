import React from 'react';
import { Pie } from 'react-chartjs-2';

interface MovementPatternsChartProps {
    data: number[];
}

const MovementPatternsChart: React.FC<MovementPatternsChartProps> = ({ data }) => {
    const chartData = {
        labels: data.map((_, index) => `Pattern ${index + 1}`),
        datasets: [{
            data,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }]
    };

    return <Pie data={chartData} />;
};

export default MovementPatternsChart;