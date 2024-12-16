import React, { useState } from 'react';

/**
 * UserTesting Component
 * This component allows users to conduct testing on the interface 
 * and gather feedback for ease of use and navigation.
 */
const UserTesting = () => {
    const [feedback, setFeedback] = useState('');
    const [responses, setResponses] = useState([]);

    /**
     * Handle feedback submission
     * @param {Event} e - The event object
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        if (feedback) {
            setResponses([...responses, feedback]); // Add feedback to responses
            setFeedback(''); // Clear feedback input
        }
    };

    return (
        <div>
            <h1>User Testing</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="feedback">Your Feedback:</label>
                <input
                    type="text"
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Enter your feedback here"
                />
                <button type="submit">Submit</button>
            </form>
            <h2>Feedback Responses:</h2>
            <ul>
                {responses.map((response, index) => (
                    <li key={index}>{response}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserTesting;