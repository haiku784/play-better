from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserReviewSchema(BaseModel):
    user_id: str  # User ID who submitted the review
    gear_option_id: str  # Gear option ID being reviewed
    review_text: str  # Text of the review
    rating: float  # Rating given by the user (0 to 5)
    created_at: Optional[datetime] = None  # Timestamp of the review submission

    class Config:
        orm_mode = True  # Allow ORM compatibility