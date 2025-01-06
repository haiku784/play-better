from fastapi import APIRouter, File, UploadFile, HTTPException
from pydantic import BaseModel
import os 

router = APIRouter()

class VideoUploadResponse(BaseModel):
    filename: str
    message: str

@router.post("/upload-video", response_model=VideoUploadResponse)
async def upload_video(file: UploadFile = File(...)):
    # Check file type
    if not file.content_type.startswith('video/'):
        raise HTTPException(status_code=400, detail="File must be a video.")

    # Check file size (limit to 1 hour of video, assuming average bitrate)
    max_size = 1 * 60 * 60 * 1000 * 1024  # 1 hour in bytes (adjust based on your definition of 'up to 1 hour')
    if file.file._file.tell() > max_size:
        raise HTTPException(status_code=400, detail="File is too large. Must be less than 1 hour.")

    # Save the file
    file_location = f"./videos/{file.filename}"
    with open(file_location, "wb") as buffer:
        buffer.write(await file.read())

    return VideoUploadResponse(filename=file.filename, message="Video uploaded successfully!")
