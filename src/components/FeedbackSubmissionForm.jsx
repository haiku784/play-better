import React, { useState } from 'react';

const FeedbackSubmissionForm = ({ onSubmissionSuccess, onSubmissionFailure }) => {
    // State variables to manage form fields and submission status
    const [userId, setUserId] = useState('');
    const [productId, setProductId] = useState('');
    const [rating, setRating] = useState(1);
    const [comments, setComments] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState('');

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        setIsSubmitting(true); // Set submitting state to true

        // Prepare the feedback data
        const feedbackData = { userId, productId, rating, comments };

        try {
            const response = await submitFeedback(feedbackData);
            // Call success callback with feedbackId on successful submission
            onSubmissionSuccess({ feedbackId: response.feedbackId });
            setSubmissionStatus('Feedback submitted successfully!');
        } catch (error) {
            // Call failure callback with error message on failed submission
            onSubmissionFailure({ error: error.message });
            setSubmissionStatus('Submission failed. Please try again.');
        } finally {
            setIsSubmitting(false); // Reset submitting state
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <input
                type='text'
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder='User ID'
                required
                style={{ margin: '10px 0', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
                type='text'
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder='Product ID'
                required
                style={{ margin: '10px 0', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
                type='number'
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min='1'
                max='5'
                required
                style={{ margin: '10px 0', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder='Your comments...'
                style={{ width: '100%', margin: '10px 0', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <button
                type='submit'
                disabled={isSubmitting}
                style={{ padding: '8px 16px', borderRadius: '4px' }}
            >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
            {submissionStatus && <p>{submissionStatus}</p>}
        </form>
    );
};

// Mock submitFeedback function
const submitFeedback = async (data) => {
    // Here you would typically make a network request to submit the feedback
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ status: 'success', feedbackId: '12345' }); // Simulated successful response
        }, 1000);
    });
};

export default FeedbackSubmissionForm;