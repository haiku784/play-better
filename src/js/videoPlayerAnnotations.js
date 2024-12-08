// Video player and annotation integration

// Function to initialize the video player and annotations
function initVideoPlayer(videoElementId, annotations) {
    const videoPlayer = document.getElementById(videoElementId);
    // Check if video player element exists
    if (!videoPlayer) {
        console.error('Video player element not found.');
        return;
    }

    // Create a container for annotations
    const annotationContainer = document.createElement('div');
    annotationContainer.classList.add('annotation-container');
    videoPlayer.parentNode.insertBefore(annotationContainer, videoPlayer.nextSibling);

    // Event listener for time updates
    videoPlayer.addEventListener('timeupdate', () => {
        displayAnnotations(videoPlayer.currentTime, annotations, annotationContainer);
    });
}

// Function to display annotations at the current timestamp
function displayAnnotations(currentTime, annotations, container) {
    // Clear existing annotations
    container.innerHTML = '';

    // Filter annotations that need to be displayed
    annotations.forEach(annotation => {
        if (currentTime >= annotation.start && currentTime <= annotation.end) {
            const annotationElement = document.createElement('div');
            annotationElement.classList.add('annotation');
            annotationElement.textContent = annotation.text;
            // Make annotations interactive
            annotationElement.onclick = () => alert(annotation.text);
            // Position the annotation
            annotationElement.style.left = `${annotation.x}%`;
            annotationElement.style.top = `${annotation.y}px`;
            container.appendChild(annotationElement);
        }
    });
}

// Example annotations data
const annotations = [
    { start: 2, end: 5, text: 'This is the first annotation', x: 10, y: 20 },
    { start: 4, end: 8, text: 'This is the second annotation', x: 30, y: 50 }
];

// Initialize the video player with annotations
initVideoPlayer('myVideo', annotations);