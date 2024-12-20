from typing import List
from sqlalchemy.orm import Session
from src.api.models import UserRecommendation

class RecommendationEngine:
    def __init__(self, db: Session):
        self.db = db

    def get_recommendations(self, user_id: int) -> List[UserRecommendation]:
        return self.db.query(UserRecommendation).filter(UserRecommendation.user_id == user_id).all()

# Summary: This class encapsulates the logic for retrieving user recommendations from the database based on user ID.