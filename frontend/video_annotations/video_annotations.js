const addAnnotation = (videoId, timestamp, comment) => {
    // Send API request to store comment at the specified timestamp in the video
    fetch(`/api/videos/${videoId}/annotations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ timestamp, comment })
    })
    .then(response => response.json())
    .then(data => console.log('Annotation added:', data))
    .catch(error => console.error('Error:', error));
};

// Example call
addAnnotation('video123', 120, 'This is an interesting play!');
