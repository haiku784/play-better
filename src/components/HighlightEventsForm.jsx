import React, { useState } from 'react';

const HighlightEventsForm = ({ onSubmit }) => {
  // State variables to manage form state
  const [matchId, setMatchId] = useState('');
  const [eventTypes, setEventTypes] = useState([]);
  const [timeRange, setTimeRange] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError('');
    
    // Call the onSubmit prop function and handle response
    try {
      const response = await onSubmit({ match_id: matchId, event_types: eventTypes, time_range: timeRange });
      setSubmissionSuccess(true);
      // Handle response as needed
    } catch (error) {
      setSubmissionError('Submission failed. Please try again.');
      setSubmissionSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input 
        type="text" 
        value={matchId} 
        onChange={(e) => setMatchId(e.target.value)} 
        placeholder="Match ID" 
        required 
        className="input-field" 
      />
      <select multiple onChange={(e) => setEventTypes([...e.target.selectedOptions].map(option => option.value))} className="input-field">
        <option value="goals">Goals</option>
        <option value="fouls">Fouls</option>
        <option value="cards">Cards</option>
      </select>
      <input 
        type="datetime-local" 
        onChange={(e) => setTimeRange({...timeRange, start_time: e.target.value})}
        className="input-field" 
      />
      <input 
        type="datetime-local" 
        onChange={(e) => setTimeRange({...timeRange, end_time: e.target.value})}
        className="input-field" 
      />
      <button type="submit" className="button-submit" disabled={isSubmitting}>Submit</button>
      {submissionError && <div className="alert-message">{submissionError}</div>}
      {submissionSuccess && <div className="alert-message">Submission Successful!</div>}
    </form>
  );
};

export default HighlightEventsForm;