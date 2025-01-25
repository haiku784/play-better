import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { retrieveFeedbacks } from '../services/feedbackService';

// FeedbackList component to display feedbacks for a product
const FeedbackList = ({ productId }) => {
    // State to manage feedbacks and loading state
    const [feedbacks, setFeedbacks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Effect to fetch feedbacks when productId changes
    useEffect(() => {
        const fetchFeedbacks = async () => {
            setIsLoading(true);
            try {
                const response = await retrieveFeedbacks({ productId });
                setFeedbacks(response.feedbacks);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFeedbacks();
    }, [productId]);

    return (
        <div>
            {isLoading ? (
                <p>Loading feedbacks...</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }}>
                    {feedbacks.map((feedback, index) => (
                        <li key={index}>
                            <span>User Rating: {feedback.rating}</span>
                            <p>{feedback.comment}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// PropTypes validation
FeedbackList.propTypes = {
    productId: PropTypes.string.isRequired,
};

export default FeedbackList;