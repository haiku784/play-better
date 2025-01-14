from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from pymongo import MongoClient

app = FastAPI()

# MongoDB client initialization
client = MongoClient('mongodb://localhost:27017/')
db = client['gameplay']  # database name

class GearMetrics(BaseModel):
    gear_option_id: str
    user_id: str
    metrics: dict
    timestamp: str

@app.get('/comparative-metrics/', response_model=List[GearMetrics])
async def get_comparative_metrics(user_id: str):
    # Fetching metrics from MongoDB
    results = list(db.gear_metrics.find({'user_id': user_id}))
    if not results:
        raise HTTPException(status_code=404, detail="No metrics found for this user")
    return results
