import React, { useState } from 'react';

const MatchDataVisualizationComponent = () => {
    const [matchId, setMatchId] = useState('');
    const [visualizationType, setVisualizationType] = useState('');
    const [timeFrame, setTimeFrame] = useState('');
    const [visualizationUrl, setVisualizationUrl] = useState('');
    const [message, setMessage] = useState('');

    const createVisualization = async () => {
        // Step to initiate visualization generation
        try {
            const response = await fetch('/api/createVisualization', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ matchId, visualizationType, timeFrame }),
            });
            const data = await response.json();
            if (response.ok) {
                setVisualizationUrl(data.visualizationUrl);
                setMessage(data.message);
                onVisualizationSuccess(data);  // Callback to handle success
            } else {
                throw new Error(data.error || 'Unknown error');
            }
        } catch (error) {
            setMessage(error.message);
            onVisualizationFailure({ error: error.message });  // Callback to handle error
        }
    };

    const onVisualizationSuccess = ({ visualizationUrl, message }) => {
        // Handle successful visualization generation
        console.log('Visualization generated successfully:', visualizationUrl);
        alert(message);
    };

    const onVisualizationFailure = ({ error }) => {
        // Handle errors in visualization generation
        console.error('Visualization generation failed:', error);
        alert(`Error: ${error}`);
    };

    return (
        <div className="visualization-container">
            <h2>Match Data Visualization</h2>
            <input type="text" placeholder="Match ID" value={matchId} onChange={e => setMatchId(e.target.value)} required />
            <input type="text" placeholder="Visualization Type" value={visualizationType} onChange={e => setVisualizationType(e.target.value)} required />
            <input type="text" placeholder="Time Frame (optional)" value={timeFrame} onChange={e => setTimeFrame(e.target.value)} />
            <button onClick={createVisualization}>Generate Visualization</button>
            {visualizationUrl && <img src={visualizationUrl} alt="Visualization" />}
            {message && <div className="error-message">{message}</div>}
        </div>
    );
};

export default MatchDataVisualizationComponent;