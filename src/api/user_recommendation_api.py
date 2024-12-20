from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from src.api.database import get_db
from src.api.models import UserRecommendation
from src.api.schemas import UserRecommendationSchema

router = APIRouter()

@router.get("/user-recommendations/{user_id}", response_model=UserRecommendationSchema)
async def get_user_recommendation(user_id: int, db: Session = Depends(get_db)):
    recommendation = db.query(UserRecommendation).filter(UserRecommendation.user_id == user_id).first()
    if not recommendation:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    return recommendation

@router.post("/user-recommendations/", response_model=UserRecommendationSchema)
async def create_user_recommendation(recommendation: UserRecommendationSchema, db: Session = Depends(get_db)):
    db.add(recommendation)
    db.commit()
    db.refresh(recommendation)
    return recommendation
