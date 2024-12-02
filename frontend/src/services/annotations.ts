async function getAnnotations(videoId: string): Promise<VideoAnnotation[]> {
    const response = await fetch(`/api/annotations/${videoId}`);
    return await response.json();
}