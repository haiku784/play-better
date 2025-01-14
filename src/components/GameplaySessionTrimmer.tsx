import React, { useState } from 'react';

const GameplaySessionTrimmer: React.FC = () => {
    const [startPoint, setStartPoint] = useState<number>(0);
    const [endPoint, setEndPoint] = useState<number>(0);

    const trimSession = () => {
        // Logic to handle trimming gameplay session
    };

    return (
        <div>
            <input type='number' value={startPoint} onChange={(e) => setStartPoint(Number(e.target.value))} />
            <input type='number' value={endPoint} onChange={(e) => setEndPoint(Number(e.target.value))} />
            <button onClick={trimSession}>Trim Session</button>
        </div>
    );
};

export default GameplaySessionTrimmer;
