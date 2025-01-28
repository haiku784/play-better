from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
from typing import List, Optional
import uuid

app = FastAPI()

class Recording(BaseModel):
    recording_id: str
    user_id: str
    game_title: str
    recording_quality: Optional[str] = '720p'
    audio_enabled: Optional[bool] = True
    status: str
    file_url: Optional[str] = None

recordings_db = []  # In-memory database for recordings

@app.post('/start_recording', response_model=Recording)
async def start_recording(
    game_title: str = Body(..., embed=True),
    user_id: str = Body(..., embed=True),
    recording_quality: Optional[str] = Body('720p', embed=True),
    audio_enabled: Optional[bool] = Body(True, embed=True)
):
    recording_id = str(uuid.uuid4())
    recording = Recording(
        recording_id=recording_id,
        user_id=user_id,
        game_title=game_title,
        recording_quality=recording_quality,
        audio_enabled=audio_enabled,
        status='success'
    )
    recordings_db.append(recording)
    return recording

@app.post('/stop_recording')
async def stop_recording(
    recording_id: str = Body(..., embed=True),
    user_id: str = Body(..., embed=True)
):
    for recording in recordings_db:
        if recording.recording_id == recording_id and recording.user_id == user_id:
            recording.status = 'stopped'
            recording.file_url = f'http://example.com/recordings/{recording.recording_id}'
            return recording
    raise HTTPException(status_code=404, detail='Recording not found')

@app.get('/get_recordings', response_model=List[Recording])
async def get_recordings(user_id: str):
    user_recordings = [rec for rec in recordings_db if rec.user_id == user_id]
    return user_recordings
