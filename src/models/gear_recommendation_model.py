from pydantic import BaseModel, Field
from typing import List

class GearRecommendation(BaseModel):
    user_id: str = Field(..., description="User's unique identifier")
    gear_ids: List[str] = Field(..., description="List of recommended gear IDs")
    timestamp: str = Field(..., description="Timestamp of the recommendation")