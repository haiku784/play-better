import React from 'react';
import { GameplaySession } from '../models/models';

interface GameplaySessionItemProps {
  session: GameplaySession;
}

const GameplaySessionItem: React.FC<GameplaySessionItemProps> = ({ session }) => {
  const handleSelect = () => {
    // Logic to handle session selection and trimming start/end
    console.log(`Session selected: ${session.title}`);
  };

  return (
    <div className="session-item" onClick={handleSelect}>
      <h3>{session.title}</h3>
      <p>{session.description}</p>
      <video src={session.videoUrl} controls />
    </div>
  );
};

export default GameplaySessionItem;