import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PerformanceMetricsOverlayForm.css'; // Assuming styles are in this file

const PerformanceMetricsOverlayForm = ({ onSuccess, onError }) => {
    const [gameplayVideoUrl, setGameplayVideoUrl] = useState('');
    const [metricsData, setMetricsData] = useState({});
    const [overlayOptions, setOverlayOptions] = useState({});
    const [status, setStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('processing');
        setErrorMessage('');

        try {
            const response = await renderMetricsOverlay({
                gameplay_video_url: gameplayVideoUrl,
                metrics_data: metricsData,
                overlay_options: overlayOptions
            });

            if (response.success) {
                setStatus('completed');
                onSuccess({ output_video_url: response.output_video_url });
            } else {
                throw new Error(response.error_message || 'Overlay failed');
            }
        } catch (error) {
            setStatus('idle');
            setErrorMessage(error.message);
            onError({ error_message: error.message });
        }
    };

    return (
        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Gameplay Video URL"
                    value={gameplayVideoUrl}
                    onChange={(e) => setGameplayVideoUrl(e.target.value)}
                    required
                    className="inputFieldStyle"
                />
                <textarea
                    placeholder="Metrics Data (JSON)"
                    onChange={(e) => setMetricsData(JSON.parse(e.target.value))}
                    required
                    className="inputFieldStyle"
                />
                <textarea
                    placeholder="Overlay Options (JSON)"
                    onChange={(e) => setOverlayOptions(JSON.parse(e.target.value))}
                    className="inputFieldStyle"
                />
                <button type="submit" className="buttonStyle">Submit</button>
                {status === 'processing' && <p>Processing...</p>}
                {status === 'completed' && <p>Overlay completed successfully!</p>}
                {errorMessage && <p className="errorMessage">{errorMessage}</p>}
            </form>
        </div>
    );
};

PerformanceMetricsOverlayForm.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
};

export default PerformanceMetricsOverlayForm;