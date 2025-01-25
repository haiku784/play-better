import React, { useState } from 'react';
import videoRetrievalService from '../services/videoRetrievalService';

const VideoRetrievalModule = () => {
    const [videos, setVideos] = useState([]);

    const fetchVideos = async () => {
        const retrievedVideos = await videoRetrievalService.getVideos();
        setVideos(retrievedVideos);
    };

    return <div>Video Retrieval Module</div>;
};

export default VideoRetrievalModule;