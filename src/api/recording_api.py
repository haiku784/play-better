from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class Recording(BaseModel):
    id: int
    data: str

# In-memory storage for recordings
recordings = {}

@app.post("/recordings/", response_model=Recording)
async def create_recording(recording: Recording):
    if recording.id in recordings:
        raise HTTPException(status_code=400, detail="Recording already exists")
    recordings[recording.id] = recording
    return recording

@app.get("/recordings/{recording_id}", response_model=Recording)
async def read_recording(recording_id: int):
    if recording_id not in recordings:
        raise HTTPException(status_code=404, detail="Recording not found")
    return recordings[recording_id]
