import { useEffect, useState } from 'react';

const useLazyLoadVideo = (videoSrc: string) => {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSrc(videoSrc);
    }, 2000); // Lazy load after 2 seconds

    return () => clearTimeout(timer);
  }, [videoSrc]);

  return src;
};

export default useLazyLoadVideo;