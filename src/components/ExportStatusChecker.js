import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { checkExportStatus } from '../utils/exportRequest';

const ExportStatusChecker = ({ exportId, onUpdate }) => {
    // State to manage loading and status
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [progress, setProgress] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    // Function to handle status check
    const handleCheckStatus = async () => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await checkExportStatus({ exportId });
            setProgress(response.progress);
            setStatus(response.isComplete ? 'Complete' : 'In Progress');
            onUpdate(response.isComplete, response.progress);
        } catch (error) {
            setErrorMessage('Failed to check status.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="status-checker-container">
            <input 
                type="text" 
                value={exportId} 
                readOnly 
                placeholder="Export ID" />
            <button onClick={handleCheckStatus} disabled={isLoading}>
                {isLoading ? 'Checking...' : 'Check Status'}
            </button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {status && <div className="status-message">Status: {status}, Progress: {progress}%</div>}
        </div>
    );
};

ExportStatusChecker.propTypes = {
    exportId: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default ExportStatusChecker;