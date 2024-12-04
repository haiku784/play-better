from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

gameplay_data = []

class Gameplay(BaseModel):
    player_id: str
    score: int
    timestamp: str

@app.post('/gameplay/')
def create_gameplay(data: Gameplay):
    gameplay_data.append(data)
    return data

@app.get('/gameplay/', response_model=List[Gameplay])
def read_gameplays():
    return gameplay_data
