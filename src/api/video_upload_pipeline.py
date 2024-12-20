import os
import uuid
from datetime import datetime
from pydantic import BaseModel, ValidationError
from fastapi import FastAPI, UploadFile, File
from typing import List

# Define a Pydantic model for video metadata validation
class VideoMetadata(BaseModel):
    title: str
    description: str
    user_id: uuid.UUID
    timestamp: datetime

# Initialize FastAPI application
app = FastAPI()

# Define an upload directory
UPLOAD_DIR = "uploads/"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@app.post("/upload-video/")
async def upload_video(file: UploadFile = File(...), metadata: VideoMetadata):
    """Endpoint to upload video files and validate metadata."""
    # Validate file type
    if not file.filename.endswith(('.mp4', '.avi', '.mov')):
        return {"error": "Invalid file type. Only .mp4, .avi, .mov are allowed."}

    # Validate metadata
    try:
        metadata_dict = metadata.dict()
        # Save the uploaded video file
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as f:
            f.write(await file.read())
        return {"message": "Upload successful", "file_path": file_path, "metadata": metadata_dict}
    except ValidationError as ve:
        return {"error": "Validation error", "details": ve.errors()}

