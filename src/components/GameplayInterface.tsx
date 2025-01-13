import React from 'react';
import RecordButton from './RecordButton';

const GameplayInterface: React.FC = () => {
    const apiUrl = 'https://api.example.com/record'; // Replace with actual API URL

    return (
        <div>
            <h1>Gameplay Interface</h1>
            <RecordButton apiUrl={apiUrl} />
        </div>
    );
};

export default GameplayInterface;