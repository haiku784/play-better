import React, { useState } from 'react';
import './VideoUploadButton.css';

const VideoUploadButton = () => {
    const [uploadStatus, setUploadStatus] = useState(null);

    const handleUpload = async (event) => {
        // Prevent default form submission
        event.preventDefault();

        const file = event.target.files[0];
        if (!file) {
            setUploadStatus('Please select a file to upload.');
            return;
        }

        try {
            // Assuming there's an API endpoint to handle the video upload
            const formData = new FormData();
            formData.append('video', file);
            const response = await fetch('/api/upload-video', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            // Get the response data if needed
            const data = await response.json();
            setUploadStatus(`Upload successful: ${data.message}`);
        } catch (error) {
            setUploadStatus(`Error: ${error.message}`);
        }
    };

    return (
        <div className="video-upload-container">
            <input type="file" accept="video/*" onChange={handleUpload} />
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default VideoUploadButton;