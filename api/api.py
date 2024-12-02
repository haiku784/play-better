from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Recording(BaseModel):
    player_id: str
    game_title: str
    duration: int

@app.post('/recording/')
async def create_recording(recording: Recording):
    # Logic to store recording in DB
    return {'message': 'Recording stored successfully', 'recording': recording}