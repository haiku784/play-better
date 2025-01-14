import React from 'react';
import StarRating from './StarRating';
import FeedbackTextBox from './FeedbackTextBox';

const FeedbackMechanism: React.FC = () => {
    const handleRatingChange = (rating: number) => {
        console.log(`User rated: ${rating}`);
    };

    const handleFeedbackSubmit = (feedback: string) => {
        console.log(`User feedback: ${feedback}`);
    };

    return (
        <div className="feedback-mechanism">
            <h2>Rate the Gear</h2>
            <StarRating onChange={handleRatingChange} />
            <h2>Provide Feedback</h2>
            <FeedbackTextBox onSubmit={handleFeedbackSubmit} />
        </div>
    );
};

export default FeedbackMechanism;