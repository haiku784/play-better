from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class PlayerPreferences(BaseModel):
    player_id: str
    play_style: str

@app.post('/gear-recommendations/')
async def gear_recommendations(preferences: PlayerPreferences):
    recommended_gear = get_recommendations(preferences)
    return {'recommended_gear': recommended_gear}

# Placeholder for gear recommendations logic

def get_recommendations(preferences):
    return ['High DPI Mouse', 'Mechanical Keyboard']