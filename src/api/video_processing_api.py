from fastapi import FastAPI, UploadFile, File, HTTPException
import cv2
import numpy as np

app = FastAPI()

@app.post("/upload-video/")
async def upload_video(file: UploadFile = File(...)):
    # Check file extension
    if not file.filename.endswith(('.mp4', '.avi', '.mov')):
        raise HTTPException(status_code=400, detail="Invalid file type. Only mp4, avi, or mov allowed.")

    # Save the uploaded file to a temporary location
    video_path = f"./temp/{file.filename}"
    with open(video_path, "wb") as buffer:
        buffer.write(await file.read())

    # Process the video using OpenCV
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise HTTPException(status_code=500, detail="Could not open video file.")

    # Example: Extracting frames and converting them to grayscale
    frame_count = 0
    while cap.isOpened():
        ret, frame = cap.read()
        if ret:
            gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            # Here you can add more processing on gray_frame
            frame_count += 1
        else:
            break

    cap.release()
    return {"message": "Video processed successfully", "frames_processed": frame_count}