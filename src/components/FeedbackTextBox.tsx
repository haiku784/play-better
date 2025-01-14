import React, { useState } from 'react';

interface FeedbackTextBoxProps {
  onFeedbackChange: (feedback: string) => void;
}

const FeedbackTextBox: React.FC<FeedbackTextBoxProps> = ({ onFeedbackChange }) => {
  const [feedback, setFeedback] = useState<string>('');
  const [error, setError] = useState<string>('');
  const charLimit = 200;
  const prohibitedWords = ['badword1', 'badword2']; // Example list

  const validateFeedback = (input: string) => {
    if (input.length > charLimit) {
      setError(`Feedback must be under ${charLimit} characters.`);
      return false;
    }
    if (prohibitedWords.some(word => input.includes(word))) {
      setError('Feedback contains prohibited words.');
      return false;
    }
    setError('');
    return true;
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (validateFeedback(value)) {
      setFeedback(value);
      onFeedbackChange(value);
    }
  };

  return (
    <div>
      <textarea value={feedback} onChange={handleChange} placeholder="Enter your feedback..." />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default FeedbackTextBox;