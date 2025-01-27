import React, { useState } from 'react';

const ExportVideoComponent = () => {
    // Component state to manage export process
    const [userId, setUserId] = useState('');
    const [videoId, setVideoId] = useState('');
    const [format, setFormat] = useState('MP4');
    const [isLoading, setIsLoading] = useState(false);
    const [exportStatus, setExportStatus] = useState('');
    const [downloadLink, setDownloadLink] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Function to initiate video export
    const initiateExport = async () => {
        setIsLoading(true);
        setExportStatus('');
        setDownloadLink('');
        setErrorMessage('');
        try {
            const response = await fetch('/api/export-video', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, videoId, format })
            });
            const result = await response.json();
            setExportStatus(result.status);
            if (result.status === 'success') {
                setDownloadLink(result.downloadLink);
            } else {
                setErrorMessage(result.errorMessage);
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Export Video</h2>
            <input type="text" placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} required />
            <input type="text" placeholder="Video ID" value={videoId} onChange={e => setVideoId(e.target.value)} required />
            <select value={format} onChange={e => setFormat(e.target.value)} required>
                <option value="MP4">MP4</option>
                <option value="AVI">AVI</option>
            </select>
            <button onClick={initiateExport} className='button-primary' disabled={isLoading}>Export</button>
            {isLoading && <p>Exporting video...</p>}
            {exportStatus === 'success' && <p className='status-success'>Export successful! <a href={downloadLink}>Download here</a></p>}
            {exportStatus === 'error' && <p className='text-error'>{errorMessage}</p>}
        </div>
    );
};

export default ExportVideoComponent;