// videoRetrievalService.js

const retrieveVideoFromAPI = async (videoId, userId) => {
    try {
        const response = await fetch(`/api/videos/${videoId}?userId=${userId}`);
        if (!response.ok) {
            throw new Error('Video retrieval failed');
        }
        return await response.blob();
    } catch (error) {
        throw new Error(error.message);
    }
};

export { retrieveVideoFromAPI };