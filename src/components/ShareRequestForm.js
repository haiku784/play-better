import React, { useState } from 'react';

const ShareRequestForm = ({ onSubmit, handleSuccess, handleError }) => {
    const [userId, setUserId] = useState('');
    const [gearId, setGearId] = useState('');
    const [platform, setPlatform] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionStatus('pending');

        try {
            const result = await onSubmit({ user_id: userId, gear_id: gearId, platform, message });
            setSubmissionStatus(result.status);
            if (result.status === 'success') {
                handleSuccess({ share_link: result.share_link });
            } else {
                handleError({ error_message: result.error_message });
            }
        } catch (error) {
            setSubmissionStatus('error');
            handleError({ error_message: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className='form-container' onSubmit={handleFormSubmit}>
            <input className='input-field' type='text' placeholder='User ID' value={userId} onChange={(e) => setUserId(e.target.value)} required />
            <input className='input-field' type='text' placeholder='Gear ID' value={gearId} onChange={(e) => setGearId(e.target.value)} required />
            <input className='input-field' type='text' placeholder='Platform' value={platform} onChange={(e) => setPlatform(e.target.value)} required />
            <input className='input-field' type='text' placeholder='Message' value={message} onChange={(e) => setMessage(e.target.value)} />
            <button className='submit-button' type='submit' disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Share'}</button>
            <div className='status-message'>{submissionStatus}</div>
        </form>
    );
};

export default ShareRequestForm;