from fastapi import FastAPI
from pydantic import BaseModel
app = FastAPI()

class GameplaySession(BaseModel):
    userId: str
    gameTitle: str
    sessionData: dict

@app.post('/gameplay/')
async def create_gameplay_session(session: GameplaySession):
    # Logic to save session
    return {'status': 'success'}