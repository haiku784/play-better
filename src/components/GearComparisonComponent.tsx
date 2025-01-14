import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface GearComparison {
    id: string;
    name: string;
    comparisonDetails: string;
}

const GearComparisonComponent: React.FC<{ gearIds: string[] }> = ({ gearIds }) => {
    const [comparisons, setComparisons] = useState<GearComparison[]>([]);

    useEffect(() => {
        const fetchComparativeMetrics = async () => {
            const response = await axios.post('/api/get-comparative-metrics', { gearIds });
            setComparisons(response.data);
        };
        fetchComparativeMetrics();
    }, [gearIds]);

    return (
        <div>
            <h2>Gear Comparison</h2>
            <table>
                <thead>
                    <tr>
                        <th>Gear</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {comparisons.map(gear => (
                        <tr key={gear.id}>
                            <td>{gear.name}</td>
                            <td>{gear.comparisonDetails}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GearComparisonComponent;