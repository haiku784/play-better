const exportVideoService = async (videoData, format) => {
    const formData = new FormData();
    formData.append('videoData', videoData);
    formData.append('format', format);

    try {
        const response = await fetch('/api/convertVideo', {  // API endpoint call
            method: 'POST',
            body: formData,
        });
        return await response.json();
    } catch (error) {
        throw new Error('Error exporting video: ' + error.message);
    }
};

export default exportVideoService;