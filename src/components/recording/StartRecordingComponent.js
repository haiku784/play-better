import React, { useState } from 'react';

const StartRecordingComponent = () => {
    const [gameTitle, setGameTitle] = useState('');
    const [userId, setUserId] = useState('');
    const [recordingQuality, setRecordingQuality] = useState('720p');
    const [audioEnabled, setAudioEnabled] = useState(false);
    const [status, setStatus] = useState('');
    const [recordingId, setRecordingId] = useState('');

    // Function to initiate recording
    const initiateRecording = async () => {
        try {
            // Prepare request payload
            const payload = {
                game_title: gameTitle,
                user_id: userId,
                recording_quality: recordingQuality,
                audio_enabled: audioEnabled
            };

            // Simulate API call to start recording (this should be your actual API endpoint)
            const response = await fetch('/api/start-recording', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            // Update status and recording ID based on response
            if (data.status === 'success') {
                setStatus('Recording started successfully.');
                setRecordingId(data.recording_id);
            } else {
                setStatus('Failed to start recording.');
            }
        } catch (error) {
            setStatus('Error occurred while starting recording.');
            console.error(error);
        }
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#f9f9f9' }}>
            <h2>Start Recording</h2>
            <div>
                <label>Game Title:</label>
                <input type="text" value={gameTitle} onChange={(e) => setGameTitle(e.target.value)} required />
            </div>
            <div>
                <label>User ID:</label>
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
            </div>
            <div>
                <label>Recording Quality:</label>
                <select value={recordingQuality} onChange={(e) => setRecordingQuality(e.target.value)}>
                    <option value="720p">720p</option>
                    <option value="1080p">1080p</option>
                    <option value="4K">4K</option>
                </select>
            </div>
            <div>
                <label>Audio Enabled:</label>
                <input type="checkbox" checked={audioEnabled} onChange={() => setAudioEnabled(!audioEnabled)} />
            </div>
            <button onClick={initiateRecording}>Start Recording</button>
            <div>
                <p>Status: {status}</p>
                {recordingId && <p>Recording ID: {recordingId}</p>}
            </div>
        </div>
    );
};

export default StartRecordingComponent;