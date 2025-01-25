import React, { useState } from 'react';

const MetricsOverlayManagement = () => {
    const [fpsValue, setFpsValue] = useState(0);
    const [latencyValue, setLatencyValue] = useState(0);
    const [fpsStatus, setFpsStatus] = useState('');
    const [latencyStatus, setLatencyStatus] = useState('');

    // Function to set FPS value for the video stream
    const setFps = (streamId, fpsValue) => {
        // Business logic to set FPS value
        if (fpsValue > 0) {
            setFpsStatus('Success');
            return { status: 'Success', message: 'FPS value set successfully.' };
        } else {
            setFpsStatus('Error');
            return { status: 'Error', message: 'Invalid FPS value.' };
        }
    };

    // Function to set Latency value for the video stream
    const setLatency = (streamId, latencyValue) => {
        // Business logic to set Latency value
        if (latencyValue >= 0) {
            setLatencyStatus('Success');
            return { status: 'Success', message: 'Latency value set successfully.' };
        } else {
            setLatencyStatus('Error');
            return { status: 'Error', message: 'Invalid latency value.' };
        }
    };

    return (
        <div className="metrics-overlay">
            <div className="fps-value-display">FPS: {fpsValue}</div>
            <div className="latency-value-display">Latency: {latencyValue} ms</div>
            <div className="fps-status">FPS Status: {fpsStatus}</div>
            <div className="latency-status">Latency Status: {latencyStatus}</div>
        </div>
    );
};

export default MetricsOverlayManagement;