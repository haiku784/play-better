import React, { useEffect, useState } from 'react';

const FeedbackList = ({ productId }) => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch feedbacks when component mounts or productId changes
    useEffect(() => {
        const retrieveFeedbacks = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/feedbacks?productId=${productId}`);
                const data = await response.json();
                setFeedbacks(data.feedbacks);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            } finally {
                setIsLoading(false);
            }
        };
        retrieveFeedbacks();
    }, [productId]);

    // Render loading indicator or feedback list
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            {feedbacks.map((feedback, index) => (
                <li key={index} style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '10px', margin: '10px 0' }}>
                    <span>User Rating: {feedback.rating}</span>
                    <p>{feedback.comment}</p>
                </li>
            ))}
        </ul>
    );
};

export default FeedbackList;