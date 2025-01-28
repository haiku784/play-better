const submitExportRequest = async ({ videoId, format, userId, quality }) => {
    try {
        const response = await fetch('/api/export', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ videoId, format, userId, quality })
        });
        return await response.json(); // Return the parsed JSON response
    } catch (error) {
        return { success: false, errorMessage: error.message }; // Handle errors gracefully
    }
};
