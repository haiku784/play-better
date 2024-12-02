from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class GameplayData(BaseModel):
    data: str

@app.post('/analyze/')
async def analyze_gameplay(data: GameplayData):
    insights = analyze_gameplay_data(data.data)
    return {'insights': insights}