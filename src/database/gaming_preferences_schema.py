from pydantic import BaseModel, Field
from typing import List, Optional

class GamingPreferencesSchema(BaseModel):
    user_id: str = Field(..., description="Unique identifier for the user")
    favorite_games: List[str] = Field(..., description="List of favorite game titles")
    play_style: str = Field(..., description="User's preferred play style (e.g., aggressive, strategic)")
    budget: Optional[float] = Field(None, description="User's budget constraints for gaming")
    timestamp: str = Field(..., description="Timestamp for when preferences were submitted")
