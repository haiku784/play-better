import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * ShareStatusDisplay component to show feedback based on share operation status.
 */
const ShareStatusDisplay = ({ submissionStatus, share_link, error_message }) => {
    const [displayMessage, setDisplayMessage] = useState('');

    useEffect(() => {
        updateDisplayMessage(submissionStatus, share_link, error_message);
    }, [submissionStatus, share_link, error_message]);

    /**
     * Updates the display message based on the current status of the share operation.
     * @param {string} status - The current status of the share operation.
     * @param {string} link - The link to the shared content.
     * @param {string} error - An error message if the operation failed.
     */
    const updateDisplayMessage = (status, link, error) => {
        switch (status) {
            case 'success':
                setDisplayMessage(`Content shared successfully! View it here: ${link}`);
                break;
            case 'error':
                setDisplayMessage(`Error sharing content: ${error}`);
                break;
            case 'pending':
                setDisplayMessage('Sharing content, please wait...');
                break;
            default:
                setDisplayMessage('');
        }
    };

    return (
        <div className={`status-display ${submissionStatus}`}>  {/* Apply styles based on submissionStatus */}
            <p>{displayMessage}</p>
        </div>
    );
};

ShareStatusDisplay.propTypes = {
    submissionStatus: PropTypes.string.isRequired,
    share_link: PropTypes.string,
    error_message: PropTypes.string,
};

export default ShareStatusDisplay;