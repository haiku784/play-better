// videoAnnotations.js - Handles video annotations for gameplay videos.

class VideoAnnotation {
    constructor(videoElement) {
        this.videoElement = videoElement;
        this.annotations = [];
    }

    addAnnotation(time, comment) {
        this.annotations.push({ time, comment });
        console.log(`Annotation added at ${time}s: ${comment}`);
    }

    editAnnotation(index, newComment) {
        if (this.annotations[index]) {
            this.annotations[index].comment = newComment;
            console.log(`Annotation at index ${index} edited.`);
        }
    }
}