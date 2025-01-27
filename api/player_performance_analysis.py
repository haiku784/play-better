from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
from api.performance_metrics_calculator import PlayerMetricsCalculator

app = FastAPI()

class MatchData(BaseModel):
    goals: int
    assists: int
    total_passes: int
    successful_passes: int

class PerformanceRequest(BaseModel):
    playerId: str
    matchData: List[MatchData]

class PerformanceResponse(BaseModel):
    performanceMetrics: Dict
    reportUrl: str

@app.post('/api/analysis/player-performance', response_model=PerformanceResponse)
async def analyze_player_performance(request: PerformanceRequest):
    """Endpoint to analyze player performance based on match data."""
    if not request.playerId or not request.matchData:
        raise HTTPException(status_code=400, detail='playerId and matchData are required.')

    performance_metrics = PlayerMetricsCalculator.calculate_player_metrics(request.playerId, request.matchData)
    report_url = f'http://example.com/reports/{request.playerId}'  # Example URL generation

    return PerformanceResponse(performanceMetrics=performance_metrics, reportUrl=report_url)