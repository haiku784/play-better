import React, { useState } from 'react';
import PropTypes from 'prop-types';

const VideoExportForm = ({ onExportSuccess }) => {
    // State variables to manage form submission, error, and success status
    const [videoId, setVideoId] = useState('');
    const [format, setFormat] = useState('');
    const [userId, setUserId] = useState('');
    const [quality, setQuality] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setIsSubmitting(true);
        setSubmitError('');
        setSubmitSuccess(false);

        try {
            // Call the export API with the current state values
            const response = await submitExportRequest({ videoId, format, userId, quality });

            if (response.success) {
                setSubmitSuccess(true);
                onExportSuccess(response.filePath); // Trigger success callback
            } else {
                throw new Error(response.errorMessage || 'Export failed');
            }
        } catch (error) {
            setSubmitError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Video ID"
                value={videoId}
                onChange={(e) => setVideoId(e.target.value)}
                required
                className="input-field"
            />
            <input
                type="text"
                placeholder="Format (e.g., MP4)"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                required
                className="input-field"
            />
            <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                className="input-field"
            />
            <input
                type="text"
                placeholder="Quality (e.g., 720p)"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="input-field"
            />
            <button type="submit" disabled={isSubmitting} className="submit-button">{isSubmitting ? 'Exporting...' : 'Export Video'}</button>
            {submitSuccess && <div className="success-message">Export successful!</div>}
            {submitError && <div className="error-message">{submitError}</div>}
        </form>
    );
};

VideoExportForm.propTypes = {
    onExportSuccess: PropTypes.func.isRequired,
};

export default VideoExportForm;
