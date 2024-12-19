from pydantic import BaseModel
from typing import List

class Recommendation(BaseModel):
    id: int  # Unique identifier for the recommendation
    score: float  # Score associated with the recommendation
    items: List[str]  # List of recommended items

    class Config:
        orm_mode = True  # To allow ORM compatibility