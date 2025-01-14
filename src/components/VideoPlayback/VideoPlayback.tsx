import React, { useEffect, useRef, useState } from 'react';

interface VideoPlaybackProps {
  videoSrc: string;
}

const VideoPlayback: React.FC<VideoPlaybackProps> = ({ videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoadedData = () => {
      setIsLoading(false);
      videoRef.current?.play(); // Start playback automatically after loading
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('loadeddata', handleLoadedData);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadeddata', handleLoadedData);
      }
    };
  }, []);

  return (
    <div className="video-container">
      {isLoading ? <p>Loading video...</p> : null}
      <video
        ref={videoRef}
        width="1920"
        height="1080"
        controls
        preload="auto"
        onCanPlay={() => setIsLoading(false)}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayback;