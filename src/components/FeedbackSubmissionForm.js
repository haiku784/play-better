import React, { useState } from 'react';
import PropTypes from 'prop-types';

const FeedbackSubmissionForm = ({ onSubmitSuccess, onSubmitError }) => {
  const [formData, setFormData] = useState({
    userId: '',
    productId: '',
    feedback: '',
    rating: 1,
    timestamp: new Date().toISOString()
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('');

    try {
      // Simulate the submission process to an API
      const response = await submitFeedback(formData);
      onSubmitSuccess(response);
      setSubmissionStatus('Feedback submitted successfully!');
    } catch (error) {
      onSubmitError(error);
      setSubmissionStatus('Error submitting feedback: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="feedback-form">
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          placeholder="User ID"
          required
          className="input-field"
        />
        <input
          type="text"
          name="productId"
          value={formData.productId}
          onChange={handleChange}
          placeholder="Product ID"
          required
          className="input-field"
        />
        <textarea
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
          placeholder="Your feedback"
          required
        />
        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          required
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button type="submit" className="submit-button" disabled={isSubmitting}>Submit</button>
      </form>
      {submissionStatus && <div className="status-message">{submissionStatus}</div>}
    </div>
  );
};

FeedbackSubmissionForm.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired
};

const submitFeedback = async (data) => {
  // This function should contain the API call logic for submitting feedback
  // For the purpose of this example, we simulate success/failure
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve({ status: 'success', message: 'Feedback recorded.' });
    } else {
      reject(new Error('Submission failed. Please try again.'));
    }
  });
};

export default FeedbackSubmissionForm;