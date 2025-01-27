import React, { useState } from 'react';

const FeedbackSubmissionForm = ({ onSubmissionSuccess, onSubmissionFailure }) => {
    // State variables for form inputs and submission status
    const [userId, setUserId] = useState('');
    const [productId, setProductId] = useState('');
    const [rating, setRating] = useState(1);
    const [comments, setComments] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState('');

    // Handle feedback submission
    const submitFeedback = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setIsSubmitting(true);
        setSubmissionStatus('');

        try {
            // Simulate API submission
            const response = await mockApiSubmitFeedback({ userId, productId, rating, comments });
            if (response.status === 'success') {
                onSubmissionSuccess({ feedbackId: response.feedbackId });
                setSubmissionStatus('Feedback submitted successfully.');
            } else {
                throw new Error('Submission failed.');
            }
        } catch (error) {
            onSubmissionFailure({ error: error.message });
            setSubmissionStatus('Failed to submit feedback.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={submitFeedback} style={{ width: '100%', margin: '10px 0' }}>
            <input
                type='text'
                placeholder='User ID'
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                required
            />
            <input
                type='text'
                placeholder='Product ID'
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                required
            />
            <input
                type='number'
                min='1'
                max='5'
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                required
            />
            <textarea
                placeholder='Comments'
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <button type='submit' disabled={isSubmitting} style={{ padding: '8px', borderRadius: '4px' }}>
                Submit Feedback
            </button>
            {submissionStatus && <div>{submissionStatus}</div>}
        </form>
    );
};

// Mock API function to simulate feedback submission
const mockApiSubmitFeedback = async (feedback) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ status: 'success', feedbackId: '12345' }); // Simulated response
        }, 1000);
    });
};

export default FeedbackSubmissionForm;