from pydantic import BaseModel, Field
from typing import Optional

class GameplayMetricsSchema(BaseModel):
    user_id: str = Field(..., description="Unique identifier for the user")
    kills: int = Field(..., ge=0, description="Number of kills")
    deaths: int = Field(..., ge=0, description="Number of deaths")
    objectives_completed: int = Field(..., ge=0, description="Number of completed objectives")
    user_preferences: Optional[dict] = Field(None, description="User-specific preferences for gameplay")
    timestamp: str = Field(..., description="Timestamp of the gameplay metrics")

    class Config:
        schema_extra = {
            "example": {
                "user_id": "user123",
                "kills": 10,
                "deaths": 5,
                "objectives_completed": 3,
                "user_preferences": {"difficulty": "hard", "play_style": "aggressive"},
                "timestamp": "2023-10-01T12:00:00Z"
            }
        }