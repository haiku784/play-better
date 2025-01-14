import React, { useEffect, useState } from 'react';
import { fetchPerformanceMetrics } from '../api/gameplay_metrics_api';
import { PerformanceMetric } from '../types';
import KillDeathRatioChart from './KillDeathRatioChart';
import CompletionRatesChart from './CompletionRatesChart';
import MovementPatternsChart from './MovementPatternsChart';
import Filter from './Filter';

const PerformanceMetricsDashboard: React.FC = () => {
    const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [filters, setFilters] = useState({}); // Add specific filters fields if needed

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const data = await fetchPerformanceMetrics(filters);
                setMetrics(data);
            } catch (err) {
                setError('Failed to fetch performance metrics');
            } finally {
                setLoading(false);
            }
        };
        fetchMetrics();
    }, [filters]); // Refetch on filter update

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Performance Metrics Dashboard</h1>
            <Filter onChange={setFilters} />
            <KillDeathRatioChart data={metrics.map(metric => metric.kills_deaths)} />
            <CompletionRatesChart data={metrics.map(metric => metric.completion_rate)} />
            <MovementPatternsChart data={metrics.map(metric => metric.movement_patterns)} />
        </div>
    );
};

export default PerformanceMetricsDashboard;