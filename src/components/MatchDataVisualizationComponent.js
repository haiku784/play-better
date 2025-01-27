import React, { useState } from 'react';

const MatchDataVisualizationComponent = () => {
    const [matchId, setMatchId] = useState('');
    const [visualizationType, setVisualizationType] = useState('');
    const [timeFrame, setTimeFrame] = useState('');
    const [visualizationUrl, setVisualizationUrl] = useState('');
    const [message, setMessage] = useState('');

    const createVisualization = async () => {
        try {
            const response = await fetch('/api/visualization', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ matchId, visualizationType, timeFrame })
            });
            const data = await response.json();
            if (response.ok) {
                // Handle successful visualization creation
                setVisualizationUrl(data.visualizationUrl);
                setMessage(data.message);
            } else {
                // Handle errors during visualization creation
                setMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createVisualization();
    };

    return (
        <div className="visualization-container">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Match ID" value={matchId} onChange={(e) => setMatchId(e.target.value)} required />
                <input type="text" placeholder="Visualization Type" value={visualizationType} onChange={(e) => setVisualizationType(e.target.value)} required />
                <input type="text" placeholder="Time Frame (optional)" value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)} />
                <button type="submit">Generate Visualization</button>
            </form>
            {visualizationUrl && <img src={visualizationUrl} alt="Visualization" />}
            {message && <h2 className={message.startsWith('Error') ? 'error-message' : ''}>{message}</h2>}
        </div>
    );
};

export default MatchDataVisualizationComponent;