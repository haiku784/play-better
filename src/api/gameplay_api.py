from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class GameplayData(BaseModel):
    data: dict

@app.post('/analyze/')
def analyze_gameplay(data: GameplayData):
    insights = analyze_gameplay_data(data.data)
    return insights