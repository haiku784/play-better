import React, { useState } from 'react';

const HighlightEventsForm = () => {
    const [matchId, setMatchId] = useState('');
    const [eventTypes, setEventTypes] = useState([]);
    const [timeRange, setTimeRange] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState('');
    const [submissionSuccess, setSubmissionSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmissionError('');
        setSubmissionSuccess(false);

        try {
            const response = await fetch('/api/highlight-events', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ match_id: matchId, event_types: eventTypes, time_range: timeRange }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Submission failed');
            }

            setSubmissionSuccess(true);
            // Handle data (e.g. display highlights)
        } catch (error) {
            setSubmissionError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <input type='text' value={matchId} onChange={(e) => setMatchId(e.target.value)} placeholder='Match ID' required />
                <select multiple onChange={(e) => setEventTypes([...e.target.selectedOptions].map(o => o.value))} required>
                    <option value='goal'>Goal</option>
                    <option value='foul'>Foul</option>
                    <option value='card'>Card</option>
                </select>
                <input type='datetime-local' onChange={(e) => setTimeRange({...timeRange, start_time: e.target.value})} />
                <input type='datetime-local' onChange={(e) => setTimeRange({...timeRange, end_time: e.target.value})} />
                <button type='submit' className='button-submit' disabled={isSubmitting}>Submit</button>
                {submissionError && <div className='alert-message'>{submissionError}</div>}
                {submissionSuccess && <div className='alert-message'>Submission Successful!</div>}
            </form>
        </div>
    );
};

export default HighlightEventsForm;