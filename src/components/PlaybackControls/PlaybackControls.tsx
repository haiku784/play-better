import React from 'react';

interface PlaybackControlsProps {
  onPlay: () => void;
  onPause: () => void;
  onRewind: () => void;
  onFastForward: () => void;
}

const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  onPlay,
  onPause,
  onRewind,
  onFastForward,
}) => {
  return (
    <div className="playback-controls">
      <button onClick={onPlay}>Play</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={onRewind}>Rewind</button>
      <button onClick={onFastForward}>Fast Forward</button>
    </div>
  );
};

export default PlaybackControls;