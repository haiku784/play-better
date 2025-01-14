import React, { useState } from 'react';
import './GameplayMetricsForm.css';

// Define the interface for the form data
interface GameplayMetrics {
    kills: number;
    deaths: number;
    completionRate: number;
}

const GameplayMetricsForm: React.FC = () => {
    const [metrics, setMetrics] = useState<GameplayMetrics>({ kills: 0, deaths: 0, completionRate: 0 });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMetrics({ ...metrics, [name]: Number(value) });
        setError(''); // Reset error message on input change
    };

    // Validate input metrics
    const validateMetrics = (): boolean => {
        if (metrics.kills < 0 || metrics.deaths < 0 || metrics.completionRate < 0 || metrics.completionRate > 100) {
            setError('Invalid input values. Ensure fields are non-negative and completion rate is between 0 and 100.');
            return false;
        }
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateMetrics()) {
            setLoading(true);
            try {
                const response = await fetch('/api/gameplay-metrics', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(metrics),
                });
                if (response.ok) {
                    setSuccess(true);
                    setMetrics({ kills: 0, deaths: 0, completionRate: 0 }); // Reset form
                } else {
                    setError('Failed to submit metrics. Please try again.');
                }
            } catch (error) {
                setError('An error occurred while submitting the form.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="gameplay-metrics-form">
            <h2>Submit Gameplay Metrics</h2>
            <label>
                Kills:
                <input type="number" name="kills" value={metrics.kills} onChange={handleChange} required min="0" />
            </label>
            <label>
                Deaths:
                <input type="number" name="deaths" value={metrics.deaths} onChange={handleChange} required min="0" />
            </label>
            <label>
                Completion Rate (%):
                <input type="number" name="completionRate" value={metrics.completionRate} onChange={handleChange} required min="0" max="100" />
            </label>
            <button type="submit" disabled={loading}>Submit</button>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">Metrics submitted successfully!</p>}
        </form>
    );
};

export default GameplayMetricsForm;