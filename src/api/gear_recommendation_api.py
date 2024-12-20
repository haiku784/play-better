from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class GearRecommendationRequest(BaseModel):
    user_id: int
    preferences: dict

class GearRecommendationResponse(BaseModel):
    recommendations: list

@router.post("/recommendations", response_model=GearRecommendationResponse)
async def get_gear_recommendations(request: GearRecommendationRequest):
    # Simulated recommendation logic based on user preferences
    if not request.user_id:
        raise HTTPException(status_code=400, detail="User ID is required")
    recommendations = [
        "Gear 1",
        "Gear 2",
        "Gear 3"
    ]  # This would be replaced with actual recommendation logic
    return GearRecommendationResponse(recommendations=recommendations)