// Service for handling video annotations
interface IVideoAnnotation {
    sessionId: string;
    timestamp: number;
    comment: string;
}

class VideoAnnotationService {
    private annotations: IVideoAnnotation[] = [];

    addAnnotation(annotation: IVideoAnnotation) {
        this.annotations.push(annotation);
    }
}