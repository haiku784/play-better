from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.api.database import get_db
from src.api.models import UserRecommendation
from src.api.schemas import UserRecommendationSchema
from src.api.recommendation_engine import RecommendationEngine

router = APIRouter()

@router.get('/recommendations/{user_id}', response_model=List[UserRecommendationSchema])
def read_recommendations(user_id: int, db: Session = Depends(get_db)):
    engine = RecommendationEngine(db)
    recommendations = engine.get_recommendations(user_id)
    if not recommendations:
        raise HTTPException(status_code=404, detail="Recommendations not found")
    return recommendations

# Summary: This FastAPI endpoint retrieves user recommendations based on user ID, using the RecommendationEngine to fetch data.