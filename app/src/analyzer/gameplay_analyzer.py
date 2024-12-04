from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class GameplayData(BaseModel):
    player_id: str
    gameplay_metrics: dict

@app.post('/analyze/')
async def analyze_gameplay(data: GameplayData):
    strengths = []
    weaknesses = []

    # Example logic for determining strengths and weaknesses
    metrics = data.gameplay_metrics
    if metrics['score'] > 1000:
        strengths.append('High Scorer')
    else:
        weaknesses.append('Needs scoring improvements')

    return {
        'player_id': data.player_id,
        'strengths': strengths,
        'weaknesses': weaknesses
    }

