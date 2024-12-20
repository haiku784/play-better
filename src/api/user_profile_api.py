from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, user_profile_crud
from .database import get_db

router = APIRouter()

@router.post('/users/', response_model=models.UserProfile)
def create_user_profile(username: str, email: str, full_name: str, bio: str, db: Session = Depends(get_db)):
    return user_profile_crud.UserProfileCRUD.create_user_profile(db, username, email, full_name, bio)

@router.get('/users/{user_id}', response_model=models.UserProfile)
def read_user_profile(user_id: int, db: Session = Depends(get_db)):
    user_profile = user_profile_crud.UserProfileCRUD.get_user_profile(db, user_id)
    if not user_profile:
        raise HTTPException(status_code=404, detail='User not found')
    return user_profile