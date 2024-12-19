from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Define a model for user gameplay statistics
class UserGameplayStats(BaseModel):
    user_id: int
    gameplay_style: str
    statistics: dict

# Define a model for gear recommendations
class GearRecommendation(BaseModel):
    gear_id: int
    gear_name: str
    gear_type: str
    suitability_score: float

# Example gear recommendations based on gameplay style
GEAR_DATABASE = {
    "aggressive": [
        GearRecommendation(gear_id=1, gear_name="Assault Rifle", gear_type="Weapon", suitability_score=0.95),
        GearRecommendation(gear_id=2, gear_name="Combat Helmet", gear_type="Armor", suitability_score=0.90)
    ],
    "defensive": [
        GearRecommendation(gear_id=3, gear_name="Sniper Rifle", gear_type="Weapon", suitability_score=0.85),
        GearRecommendation(gear_id=4, gear_name="Shield", gear_type="Armor", suitability_score=0.92)
    ],
}

@app.post("/recommendations/", response_model=List[GearRecommendation])
async def recommend_gear(stats: UserGameplayStats):
    """Returns gear recommendations based on the user's gameplay style"""
    gameplay_style = stats.gameplay_style.lower()
    if gameplay_style not in GEAR_DATABASE:
        raise HTTPException(status_code=404, detail="Gameplay style not found")
    return GEAR_DATABASE[gameplay_style]  
