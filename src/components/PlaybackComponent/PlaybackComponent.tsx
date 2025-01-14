import React from 'react';
import VideoPlayback from './VideoPlayback';
import PlaybackControls from './PlaybackControls';
import useLazyLoadVideo from '../hooks/useLazyLoadVideo';

interface PlaybackComponentProps {
  videoSrc: string;
}

const PlaybackComponent: React.FC<PlaybackComponentProps> = ({ videoSrc }) => {
  const lazyVideoSrc = useLazyLoadVideo(videoSrc);

  const handlePlay = () => {
    console.log('Playing video');
  };

  const handlePause = () => {
    console.log('Paused video');
  };

  const handleRewind = () => {
    console.log('Rewinding video');
  };

  const handleFastForward = () => {
    console.log('Fast Forwarding video');
  };

  return (
    <div className="playback-component">
      {lazyVideoSrc && <VideoPlayback videoSrc={lazyVideoSrc} />}
      <PlaybackControls
        onPlay={handlePlay}
        onPause={handlePause}
        onRewind={handleRewind}
        onFastForward={handleFastForward}
      />
    </div>
  );
};

export default PlaybackComponent;