from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import os

app = FastAPI()

# Define a model for response
class UploadResponse(BaseModel):
    filename: str
    message: str

# Directory to save uploaded recordings
UPLOAD_DIRECTORY = "recordings"

# Ensure the upload directory exists
if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)

@app.post("/upload-recording", response_model=UploadResponse)
async def upload_recording(file: UploadFile = File(...)):
    """
    Endpoint to upload user recordings. The recording is validated for type and size.
    """
    # Validate file type
    if not file.content_type.startswith('audio/'):
        raise HTTPException(status_code=400, detail="Invalid file type. Only audio files are allowed.")

    # Validate file size (limit to 10MB)
    if file.spool_max_size > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size exceeds 10MB limit.")

    # Save the file
    file_location = os.path.join(UPLOAD_DIRECTORY, file.filename)
    with open(file_location, "wb") as f:
        content = await file.read()  # async read
        f.write(content)

    return UploadResponse(filename=file.filename, message="Upload successful!")
