from pydantic import BaseModel, Field
from typing import Optional

class GameplayMetricsSchema(BaseModel):
    user_id: str = Field(..., description="ID of the user")
    kills: int = Field(..., description="Total number of kills")
    deaths: int = Field(..., description="Total number of deaths")
    objectives_completed: int = Field(..., description="Number of objectives completed")
    preferences: Optional[dict] = Field(None, description="User preferences for gameplay")
    timestamp: str = Field(..., description="Timestamp when metrics were recorded")

    class Config:
        schema_extra = {
            "example": {
                "user_id": "user123",
                "kills": 15,
                "deaths": 5,
                "objectives_completed": 3,
                "preferences": {"difficulty": "hard"},
                "timestamp": "2023-03-15T12:34:56Z"
            }
        }