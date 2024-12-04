from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class PlayerPreference(BaseModel):
    playerId: str

@app.post('/recommend-gear/')
async def recommend_gear(preference: PlayerPreference):
    # Logic to provide gear recommendations
    return { 'gear': ['Gear A', 'Gear B'] }