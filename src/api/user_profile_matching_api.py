from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from . import models, recommendation_engine
from .database import get_db

router = APIRouter()

@router.post('/recommendations/')
def get_recommendations(user_preferences: list, db: Session = Depends(get_db)):
    profiles = db.query(models.UserProfile).all()
    recommendation_system = recommendation_engine.UserRecommendationEngine(profiles)
    return recommendation_system.recommend(user_preferences)