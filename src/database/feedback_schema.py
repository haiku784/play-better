from pydantic import BaseModel, constr, Field
from typing import Optional

class UserFeedbackSchema(BaseModel):
    user_id: constr(min_length=1) = Field(..., title="User ID", description="The ID of the user providing feedback.")
    gear_id: constr(min_length=1) = Field(..., title="Gear ID", description="The ID of the gear being reviewed.")
    rating: int = Field(..., ge=1, le=5, title="Rating", description="Rating given by the user, must be between 1 and 5.")
    comments: Optional[constr(max_length=255)] = Field(None, title="Comments", description="Optional comments provided by the user.")
    timestamp: Optional[str] = Field(None, title="Timestamp", description="Timestamp of the feedback submission.")

    class Config:
        schema_extra = {
            "example": {
                "user_id": "user123",
                "gear_id": "gear456",
                "rating": 5,
                "comments": "Great gear!",
                "timestamp": "2023-10-01T12:00:00Z"
            }
        }