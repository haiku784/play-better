import React, { useState } from 'react';

interface FeedbackTextBoxProps {
    onSubmit: (feedback: string) => void;
}

const FeedbackTextBox: React.FC<FeedbackTextBoxProps> = ({ onSubmit }) => {
    const [feedback, setFeedback] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setFeedback(value);
        setIsValid(value.length >= 10); // Simple validation: minimum 10 characters
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isValid) {
            onSubmit(feedback);
            setFeedback(''); // Reset feedback after submission
        }
    };

    return (
        <form onSubmit={handleSubmit} className="feedback-text-box">
            <textarea
                value={feedback}
                onChange={handleChange}
                placeholder="Provide your feedback here..."
                required
            />
            {!isValid && <span className="error">Feedback must be at least 10 characters long.</span>}
            <button type="submit" disabled={!isValid}>Submit</button>
        </form>
    );
};

export default FeedbackTextBox;