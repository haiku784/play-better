import React, { useEffect, useState } from 'react';

const SuggestionsDashboard = () => {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await fetch('/api/suggestions');
                const data = await response.json();
                setSuggestions(data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        };
        
        // Fetch suggestions initially
        fetchSuggestions();
        
        // Set up interval to fetch suggestions every 5 seconds
        const intervalId = setInterval(fetchSuggestions, 5000);
        return () => clearInterval(intervalId);  // Cleanup on unmount
    }, []);

    return (
        <div>
            <h1>Suggestions Dashboard</h1>
            <ul>
                {suggestions.map(suggestion => (
                    <li key={suggestion.id}>{suggestion.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default SuggestionsDashboard;