from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List
from datetime import datetime
from pymongo import MongoClient

app = FastAPI()

# MongoDB client setup
db_client = MongoClient('mongodb://localhost:27017/')
database = db_client['gameplay_metrics']
collection = database['metrics']

# Pydantic model for gameplay metrics
class GameplayMetrics(BaseModel):
    user_id: str
    session_id: str
    kills: int
    deaths: int
    objectives_completed: int
    timestamp: datetime

class PerformanceInsights(BaseModel):
    kill_death_ratio: float
    completion_rate: float

@app.post('/gameplay_metrics/save', response_model=PerformanceInsights)
async def save_gameplay_metrics(metrics: GameplayMetrics):
    # Calculate insights
    kill_death_ratio = metrics.kills / metrics.deaths if metrics.deaths > 0 else metrics.kills
    completion_rate = metrics.objectives_completed / (metrics.kills + metrics.deaths) if (metrics.kills + metrics.deaths) > 0 else 0.0

    # Save to MongoDB
    result = collection.insert_one(metrics.dict())

    if result.inserted_id:
        return PerformanceInsights(
            kill_death_ratio=kill_death_ratio,
            completion_rate=completion_rate
        )
    else:
        raise HTTPException(status_code=500, detail='Error saving metrics')

@app.get('/gameplay_metrics/{user_id}', response_model=List[GameplayMetrics])
async def get_gameplay_metrics(user_id: str):
    metrics = list(collection.find({'user_id': user_id}))
    if not metrics:
        raise HTTPException(status_code=404, detail='Metrics not found')
    return metrics
