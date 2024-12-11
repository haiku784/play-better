import React, { useState, useEffect } from 'react';

const GameComponent = () => {
    // State to hold game data
    const [gameData, setGameData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to simulate fetching game data asynchronously
    const fetchGameData = async () => {
        // Simulating an API call
        const response = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({ score: 100, level: 2 });
            }, 2000); // Simulate a 2-second delay
        });
        return response;
    };

    useEffect(() => {
        const updateGameData = async () => {
            setLoading(true); // Set loading state
            try {
                const data = await fetchGameData(); // Wait for data
                setGameData(data); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching game data:', error);
            } finally {
                setLoading(false); // Reset loading state
            }
        };

        updateGameData(); // Call the update function
    }, []); // Empty dependency array means this runs once on mount

    if (loading) {
        return <div>Loading...</div>; // Show loading text while fetching
    }

    // Render the game data once loaded
    return (
        <div>
            <h1>Game Score: {gameData.score}</h1>
            <h2>Level: {gameData.level}</h2>
        </div>
    );
};

export default GameComponent;