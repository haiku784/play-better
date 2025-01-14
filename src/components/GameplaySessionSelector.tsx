import React, { useState } from 'react';
import { GameplaySession } from '../models/models';

interface GameplaySessionSelectorProps {
  session: GameplaySession;
}

const GameplaySessionSelector: React.FC<GameplaySessionSelectorProps> = ({ session }) => {
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(session.duration);

  const handleTrimStart = () => {
    // Logic to update the start time
    console.log(`Trim start set to ${startTime}`);
  };

  const handleTrimEnd = () => {
    // Logic to update the end time
    console.log(`Trim end set to ${endTime}`);
  };

  return (
    <div className="session-selector">
      <h3>{session.title}</h3>
      <label>
        Trim Start:
        <input type="number" value={startTime} onChange={(e) => setStartTime(Number(e.target.value))} />
      </label>
      <button onClick={handleTrimStart}>Set Trim Start</button>
      <label>
        Trim End:
        <input type="number" value={endTime} onChange={(e) => setEndTime(Number(e.target.value))} />
      </label>
      <button onClick={handleTrimEnd}>Set Trim End</button>
    </div>
  );
};

export default GameplaySessionSelector;