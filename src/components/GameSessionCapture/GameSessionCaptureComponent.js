import React, { useEffect, useState } from 'react';

const GameSessionCaptureComponent = () => {
    const [sessionData, setSessionData] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const socket = new WebSocket('ws://your-websocket-url');

    useEffect(() => {
        // Open WebSocket connection
        socket.addEventListener('open', () => {
            console.log('Connected to WebSocket');
            setIsConnected(true);
        });

        // Listen for messages from the server
        socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            captureSessionData(data);
        });

        // Close WebSocket connection on component unmount
        return () => {
            socket.close();
            console.log('WebSocket connection closed');
        };
    }, []);

    const captureSessionData = (data) => {
        // Add the new session data to the sessionData state
        setSessionData((prevData) => [...prevData, data]);
        // Log session data for debugging purposes
        console.log('Captured session data:', data);
    };

    return (
        <div>
            <h2>Gameplay Session Capture</h2>
            {isConnected ? <p>Connected to the server.</p> : <p>Connecting...</p>}
        </div>
    );
};

export default GameSessionCaptureComponent;