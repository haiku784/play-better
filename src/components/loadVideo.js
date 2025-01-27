const loadVideo = async (videoUrl) => {
    try {
        const response = await fetch(videoUrl);
        if (!response.ok) {
            throw new Error('Video loading failed.');
        }
        return { status: 'loaded', errorMessage: null };
    } catch (error) {
        return { status: 'error', errorMessage: error.message };
    }
};