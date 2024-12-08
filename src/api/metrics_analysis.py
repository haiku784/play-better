from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import pandas as pd

app = FastAPI()

# Dummy metrics data retrieval function
def retrieve_metrics():
    # In a real implementation, this would query a database or an external service
    return {'score': 85, 'time_played': 300, 'levels_completed': 10}

# Request model for incoming data
class PlayerMetrics(BaseModel):
    score: int
    time_played: int
    levels_completed: int

# Analyze metrics to provide suggestions
def analyze_metrics(metrics: PlayerMetrics):
    suggestions = []
    if metrics.score < 50:
        suggestions.append('Try improving your score by focusing on key levels.')
    if metrics.time_played < 100:
        suggestions.append('Consider spending more time to master the gameplay.')
    if metrics.levels_completed < 5:
        suggestions.append('Complete more levels for better rewards.')
    return suggestions

@app.get('/metrics', response_model=list)
async def get_metrics():
    # Retrieve metrics data
    metrics_data = retrieve_metrics()
    # Convert to PlayerMetrics model
    metrics = PlayerMetrics(**metrics_data)
    # Analyze metrics
    suggestions = analyze_metrics(metrics)
    return suggestions
