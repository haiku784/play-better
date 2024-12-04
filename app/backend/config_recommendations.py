from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class ConfigPreferences(BaseModel):
    player_id: str
    settings_adjustments: dict

@app.post('/config-recommendations/')
async def config_recommendations(preferences: ConfigPreferences):
    optimal_settings = optimize_settings(preferences)
    return {'optimal_settings': optimal_settings}

# Placeholder for optimizing settings logic

def optimize_settings(preferences):
    return {'sensitivity': 'low', 'resolution': '1440p'}