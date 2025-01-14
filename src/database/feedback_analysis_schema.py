from pydantic import BaseModel, Field
from typing import Optional

class FeedbackAnalysisSchema(BaseModel):
    user_id: str = Field(..., description="The ID of the user providing feedback.")
    gear_id: str = Field(..., description="The ID of the gear being analyzed.")
    aggregated_ratings: float = Field(..., ge=0, le=5, description="Aggregated rating value between 0 and 5.")
    insights: Optional[str] = Field(None, description="Insights derived from user feedback.")
    timestamp: str = Field(..., description="The time when the analysis was performed.")
