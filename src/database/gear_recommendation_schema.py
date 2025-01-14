from pydantic import BaseModel
from typing import List, Optional

class GearRecommendation(BaseModel):
    user_id: str
    gameplay_metrics: dict
    recommended_gears: List[str]
    timestamp: Optional[str] = None