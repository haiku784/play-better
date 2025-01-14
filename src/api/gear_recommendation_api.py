from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from .ai_analysis_module import analyze_and_recommend_gears, fetch_recommendations

app = FastAPI()

class RecommendationRequest(BaseModel):
    user_id: str
    gameplay_metrics: dict

class RecommendationResponse(BaseModel):
    recommendations: List[str]

@app.post('/recommend-gear', response_model=RecommendationResponse)
async def get_gear_recommendations(request: RecommendationRequest):
    try:
        recommendation = await analyze_and_recommend_gears(request.user_id, request.gameplay_metrics)
        return RecommendationResponse(recommendations=recommendation.recommended_gears)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get('/get-recommendations/{user_id}', response_model=List[RecommendationResponse])
async def get_previous_recommendations(user_id: str):
    try:
        recommendations = await fetch_recommendations(user_id)
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))