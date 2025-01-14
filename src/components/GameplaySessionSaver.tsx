import React, { useState } from 'react';

const GameplaySessionSaver: React.FC = () => {
    const [format, setFormat] = useState<string>('MP4');
    const [quality, setQuality] = useState<string>('Medium');

    const handleFormatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormat(event.target.value);
    };

    const handleQualityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setQuality(event.target.value);
    };

    const handleSave = async () => {
        const response = await fetch('/api/save-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ format, quality }),
        });

        if (!response.ok) {
            console.error('Failed to save session');
        }
    };

    return (
        <div>
            <h2>Save Gameplay Session</h2>
            <label>
                Format:
                <select value={format} onChange={handleFormatChange}>
                    <option value="MP4">MP4</option>
                    <option value="AVI">AVI</option>
                    <option value="MKV">MKV</option>
                </select>
            </label>
            <label>
                Quality:
                <select value={quality} onChange={handleQualityChange}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </label>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default GameplaySessionSaver;