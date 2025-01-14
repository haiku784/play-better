import React, { useState } from 'react';
import FeedbackNotification from './FeedbackNotification';

const FeedbackMechanism: React.FC = () => {
    const [notification, setNotification] = useState<{ message: string; status: 'success' | 'error' } | null>(null);

    const handleSubmit = async () => {
        try {
            // Assume submitFeedback is a function that submits feedback.
            await submitFeedback();
            setNotification({ message: 'Feedback submitted successfully!', status: 'success' });
        } catch (error) {
            setNotification({ message: 'Failed to submit feedback.', status: 'error' });
        }
    };

    const handleCloseNotification = () => {
        setNotification(null);
    };

    return (
        <div>
            <button onClick={handleSubmit}>Submit Feedback</button>
            {notification && (
                <FeedbackNotification 
                    message={notification.message} 
                    status={notification.status} 
                    onClose={handleCloseNotification} 
                />
            )}
        </div>
    );
};

export default FeedbackMechanism;
