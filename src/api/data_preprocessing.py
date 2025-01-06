import cv2
import numpy as np

def preprocess_video(video_path):
    """Preprocess the uploaded video for analysis."""
    video_capture = cv2.VideoCapture(video_path)
    frames = []

    while video_capture.isOpened():
        ret, frame = video_capture.read()
        if not ret:
            break
        # Resize or transform frame as needed
        frame = cv2.resize(frame, (640, 480))
        frames.append(frame)

    video_capture.release()
    return np.array(frames)  # Return frames as numpy array
