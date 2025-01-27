import React, { useState } from 'react';

const MetricsOverlayManagement = () => {
    // State variables for FPS and Latency status
    const [fpsStatus, setFpsStatus] = useState('');
    const [latencyStatus, setLatencyStatus] = useState('');
    const [fpsValue, setFpsValue] = useState(0);
    const [latencyValue, setLatencyValue] = useState(0);

    // Function to set FPS value
    const setFps = (streamId, fps) => {
        // Logic to set FPS for the video stream
        // Assume we have an API call here
        if (fps > 0) {
            setFpsStatus('success');
            return { status: 'success', message: 'FPS value set successfully.' };
        }
        setFpsStatus('error');
        return { status: 'error', message: 'Failed to set FPS value.' };
    };

    // Function to set Latency value
    const setLatency = (streamId, latency) => {
        // Logic to set latency for the video stream
        // Assume we have an API call here
        if (latency >= 0) {
            setLatencyStatus('success');
            return { status: 'success', message: 'Latency value set successfully.' };
        }
        setLatencyStatus('error');
        return { status: 'error', message: 'Failed to set latency value.' };
    };

    return (
        <div className="metrics-overlay">
            <div className="fps-status" style={{ color: fpsStatus === 'success' ? 'green' : 'red' }}>
                FPS Status: {fpsStatus}
            </div>
            <div className="latency-status" style={{ color: latencyStatus === 'success' ? 'green' : 'red' }}>
                Latency Status: {latencyStatus}
            </div>
            <input type="number" value={fpsValue} onChange={(e) => setFpsValue(e.target.value)} placeholder="Enter FPS" />
            <button onClick={() => setFps('unique_stream_id', fpsValue)}>Set FPS</button>
            <input type="number" value={latencyValue} onChange={(e) => setLatencyValue(e.target.value)} placeholder="Enter Latency" />
            <button onClick={() => setLatency('unique_stream_id', latencyValue)}>Set Latency</button>
        </div>
    );
};

export default MetricsOverlayManagement;