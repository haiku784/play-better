from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

class UserPreferences(BaseModel):
    game_types: List[str]
    brands: List[str]
    price_range: List[float]

class RecommendationRequest(BaseModel):
    user_id: str
    preferences: UserPreferences
    feedback_score: Optional[float] = None

class RecommendationResponse(BaseModel):
    recommendations: List[str]  # This could be a more complex object
    timestamp: str

@app.post("/api/recommendations", response_model=RecommendationResponse)
async def generate_recommendations(request: RecommendationRequest):
    # Validate user ID and preferences
    if not request.user_id or not request.preferences:
        raise HTTPException(status_code=400, detail="User ID and preferences are required")
    
    # Here you would implement the logic to generate recommendations based on user profile and preferences.
    # This is a mock implementation
    recommendations = ["Gear A", "Gear B", "Gear C"]
    timestamp = "2025-01-27T09:19:21"  # Replace with actual timestamp generation logic
    
    return RecommendationResponse(recommendations=recommendations, timestamp=timestamp)