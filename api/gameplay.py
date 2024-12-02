from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class GameplaySession(BaseModel):
    user_id: str
    game_title: str
    recorded_data: dict

@app.post('/record')
async def record_gameplay(session: GameplaySession):
    # Logic to save gameplay data
    return {'message': 'Gameplay recorded successfully'}