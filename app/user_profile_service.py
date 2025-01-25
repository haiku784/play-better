from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

class UserProfileRequest(BaseModel):
    user_id: str

class UserProfileResponse(BaseModel):
    user_id: str
    preferences: Optional[List[str]]
    purchase_history: Optional[List[str]]
    recommended_items: List[str]

@app.get('/user-profile', response_model=UserProfileResponse)
async def get_user_profile(request: UserProfileRequest):
    if not request.user_id:
        raise HTTPException(status_code=400, detail="User ID is required.")
    # Logic to fetch user profile from the database
    user_profile = await fetch_user_profile(request.user_id)
    return user_profile

async def fetch_user_profile(user_id: str) -> UserProfileResponse:
    # Placeholder logic for fetching user profile
    return UserProfileResponse(user_id=user_id, preferences=[], purchase_history=[], recommended_items=["recommendation 1", "recommendation 2"])