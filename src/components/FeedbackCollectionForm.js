import React, { useState } from 'react';

/**
 * FeedbackCollectionForm Component
 * This component allows users to submit feedback regarding the video analysis feature.
 */
const FeedbackCollectionForm = () => {
    const [feedback, setFeedback] = useState('');
    const [userName, setUserName] = useState('');
    const [submitted, setSubmitted] = useState(false);

    /**
     * Handles the submission of the feedback form.
     * It prevents default form submission and allows us to handle the submission here.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        // Simulate sending feedback to an API or backend
        console.log('Feedback submitted:', { userName, feedback });
        // Set submitted to true to show confirmation message
        setSubmitted(true);
    };

    return (
        <div>
            <h2>Feedback on Video Analysis Feature</h2>
            {submitted ? (
                <p>Thank you for your feedback!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="userName">Your Name:</label>
                        <input
                            type="text"
                            id="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="feedback">Your Feedback:</label>
                        <textarea
                            id="feedback"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Submit Feedback</button>
                </form>
            )}
        </div>
    );
};

export default FeedbackCollectionForm;