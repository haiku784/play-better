import React, { useState } from 'react';

// Main component for retrieving and displaying data trends
const DataTrendRetrievalComponent = () => {
    // State for trends data and messages
    const [trends, setTrends] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Function to fetch trends based on category and optional filter options
    const fetchTrends = async (category, filterOptions) => {
        setLoading(true);
        setMessage('');
        try {
            const response = await fetch(`/api/trends?category=${category}`, {
                method: 'POST',
                body: JSON.stringify(filterOptions),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                onTrendsFetchSuccess(data.trends, data.message);
            } else {
                onTrendsFetchFailure(data.error);
            }
        } catch (error) {
            onTrendsFetchFailure(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Callback for successful trend data retrieval
    const onTrendsFetchSuccess = (trends, message) => {
        setTrends(trends);
        setMessage(message);
    };

    // Callback for handling errors in trend retrieval
    const onTrendsFetchFailure = (error) => {
        setMessage(`Error: ${error}`);
    };

    return (
        <div>
            <h2>Data Trends</h2>
            {loading && <div className='loading-indicator'>Loading...</div>}
            {message && <div className='error-message'>{message}</div>}
            <div className='trends-display'>
                <ul>
                    {trends.map((trend, index) => (<li key={index}>{trend}</li>))}
                </ul>
            </div>
        </div>
    );
};

export default DataTrendRetrievalComponent;