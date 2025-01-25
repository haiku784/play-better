import React, { useState } from 'react';

const DataTrendRetrievalComponent = () => {
    const [trends, setTrends] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch trends based on category and optional filter options
    const fetchTrends = async (category, filterOptions) => {
        setLoading(true);
        setMessage('');
        try {
            const response = await fetch('/api/trends', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category, filterOptions }),
            });
            const data = await response.json();
            if (response.ok) {
                setTrends(data.trends);
                setMessage(data.message);
                onTrendsFetchSuccess(data);
            } else {
                throw new Error(data.message || 'Fetch failed');
            }
        } catch (error) {
            setMessage(error.message);
            onTrendsFetchFailure({ error: error.message });
        } finally {
            setLoading(false);
        }
    };

    // Callback function for successful trends fetching
    const onTrendsFetchSuccess = ({ trends, message }) => {
        console.log('Trends fetched successfully:', trends);
        // Additional success handling can be added here
    };

    // Callback function for failed trends fetching
    const onTrendsFetchFailure = ({ error }) => {
        console.error('Error fetching trends:', error);
        // Additional failure handling can be added here
    };

    return (
        <div>
            <h1>Data Trend Retrieval</h1>
            <button onClick={() => fetchTrends('scoring', { team: 'A' })}>
                Fetch Trends
            </button>
            {loading && <div>Loading...</div>}
            {message && <div className='error-message'>{message}</div>}
            <div className='trends-display'>
                <ul>
                    {trends.map(trend => (<li key={trend.id}>{trend.description}</li>))}
                </ul>
            </div>
        </div>
    );
};

export default DataTrendRetrievalComponent;