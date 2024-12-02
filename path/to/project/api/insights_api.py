from fastapi import FastAPI
from pydantic import BaseModel
app = FastAPI()

class GameplayInsights(BaseModel):
    sessionId: str
    insights: dict

@app.post('/insights/')
async def submit_insights(insights: GameplayInsights):
    # Logic to save insights
    return {'status': 'success'}