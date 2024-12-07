// VideoAnnotationsService.js
import axios from 'axios';

const API_URL = '/api/annotations';

const VideoAnnotationsService = {
    saveAnnotation: async (videoId, timestamp, comment) => {
        try {
            const response = await axios.post(`${API_URL}/save`, { videoId, timestamp, comment });
            return response.data;
        } catch (error) {
            console.error('Error saving annotation:', error);
            throw error;
        }
    },
    fetchAnnotations: async (videoId) => {
        try {
            const response = await axios.get(`${API_URL}/fetch/${videoId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching annotations:', error);
            throw error;
        }
    }
};

export default VideoAnnotationsService;