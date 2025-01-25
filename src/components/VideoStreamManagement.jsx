import React, { useState } from 'react';

const VideoStreamManagement = () => {
    // States to manage stream ID and initialization status
    const [streamId, setStreamId] = useState('');
    const [initializationStatus, setInitializationStatus] = useState('');

    // Function to initialize the video stream
    const initializeStream = async (resolution, frameRate) => {
        try {
            const response = await recordingService.initializeStream({ resolution, frame_rate: frameRate });
            // Update state with new stream ID and status
            setStreamId(response.stream_id);
            setInitializationStatus(response.status);
            // Call the callback function after initialization
            onStreamInitialized(response.stream_id, response.status);
        } catch (error) {
            console.error('Error initializing stream:', error);
            // Handle error case
            setInitializationStatus('Failed to initialize stream');
        }
    };

    // Callback function for stream initialization
    const onStreamInitialized = (streamId, status) => {
        console.log(`Stream Initialized: ID - ${streamId}, Status - ${status}`);
        // Here you can implement additional logic if necessary
    };

    return (
        <div className="stream-container">
            <h2>Video Stream Management</h2>
            <input type="text" placeholder="Resolution (e.g. 1920x1080)" id="resolution" />
            <input type="number" placeholder="Frame Rate" id="frameRate" />
            <button onClick={() => initializeStream(document.getElementById('resolution').value, document.getElementById('frameRate').value)}>Start Stream</button>
            <p className="status-message">Stream ID: {streamId}</p>
            <p className="status-message">Initialization Status: {initializationStatus}</p>
        </div>
    );
};

export default VideoStreamManagement;