from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()

class UserPerformance(BaseModel):
    user_id: str
    gameplay_style: str
    performance_metrics: Dict[str, float]

class GearRecommendation(BaseModel):
    user_id: str
    recommendations: List[str]

# Dummy database of gear based on gameplay style
GEAR_DATABASE = {
    'aggressive': ['Sword of Valor', 'Shield of Resilience'],
    'defensive': ['Armor of Fortitude', 'Staff of Wisdom'],
    'stealth': ['Cloak of Shadows', 'Dagger of Silence']
}

@app.post('/recommend_gear/', response_model=GearRecommendation)
async def recommend_gear(user_performance: UserPerformance):
    
    # Validate gameplay style
    if user_performance.gameplay_style not in GEAR_DATABASE:
        raise HTTPException(status_code=404, detail="Gameplay style not found.")

    # Generate recommendations based on gameplay style
    recommended_gear = GEAR_DATABASE[user_performance.gameplay_style]

    return GearRecommendation(user_id=user_performance.user_id, recommendations=recommended_gear)