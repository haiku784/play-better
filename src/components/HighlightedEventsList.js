import React, { useState } from 'react';

const HighlightedEventsList = ({ highlights }) => {
    // State to manage loading status and potential error messages
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Function to fetch highlights for display
    const fetchHighlights = (highlights) => {
        setIsLoading(true);
        setErrorMessage('');
        // Simulate fetching data and processing highlights
        try {
            // Here, you would include logic or API calls to fetch highlights
            const displayedHighlights = highlights.filter(event => event.isHighlighted);
            setIsLoading(false);
            return displayedHighlights;
        } catch (error) {
            setIsLoading(false);
            setErrorMessage('Error fetching highlights');
            console.error(error);
        }
    };

    // Handle highlight click event
    const handleHighlightClick = (event_id) => {
        // Logic to handle click event, could involve fetching additional details
        console.log('Highlight clicked:', event_id);
        // You might want to fetch event details here.
    };

    // Fetch highlights when component mounts or highlights prop changes
    const displayedHighlights = fetchHighlights(highlights);

    return (
        <div className="list-container">
            {isLoading ? <p>Loading...</p> : null}
            {errorMessage ? <p>{errorMessage}</p> : null}
            <ul>
                {displayedHighlights && displayedHighlights.map((highlight, index) => (
                    <li key={index} className="highlight-item" onClick={() => handleHighlightClick(highlight.id)}>
                        <span>{highlight.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HighlightedEventsList;