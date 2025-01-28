import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RecommendationRequestForm = ({ onSubmitSuccess, onSubmitError }) => {
    // State to manage form fields and loading/error states
    const [userId, setUserId] = useState('');
    const [preferences, setPreferences] = useState({});
    const [feedbackScore, setFeedbackScore] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        // Prepare input for API call
        const requestData = { user_id: userId, preferences, feedback_score: feedbackScore };

        try {
            // Call the API to submit the recommendation request
            const response = await fetch('/api/recommendations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData),
            });
            const data = await response.json();

            // Check if the response was successful
            if (!response.ok) throw new Error(data.error || 'Error fetching recommendations');

            // Invoke success callback with recommendations
            onSubmitSuccess(data);
        } catch (error) {
            // Invoke error callback with error message
            setErrorMessage(error.message);
            onSubmitError({ error: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='User ID'
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                style={{ margin: '10px' }}
            />
            <textarea
                placeholder='Preferences'
                value={JSON.stringify(preferences)}
                onChange={(e) => setPreferences(JSON.parse(e.target.value))}
                required
                style={{ margin: '10px' }}
            />
            <input
                type='number'
                placeholder='Feedback Score'
                value={feedbackScore || ''}
                onChange={(e) => setFeedbackScore(e.target.value)}
                style={{ margin: '10px' }}
            />
            <button type='submit' style={{ backgroundColor: 'blue', color: 'white', padding: '10px' }}>
                Submit
            </button>
            {isLoading && <div>Loading...</div>}
            {errorMessage && <div className='error'>{errorMessage}</div>}
        </form>
    );
};

RecommendationRequestForm.propTypes = {
    onSubmitSuccess: PropTypes.func.isRequired,
    onSubmitError: PropTypes.func.isRequired,
};

export default RecommendationRequestForm;