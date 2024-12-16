from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from crud import UserPreferenceCRUD
from models import UserPreference

router = APIRouter()

@router.post('/preferences/', response_model=UserPreference)
def create_user_preference(preference: UserPreference, db: Session = Depends(get_db)):
    return UserPreferenceCRUD.create_user_preference(db, preference.user_id, preference.gear_type, preference.preference_level)

@router.get('/preferences/{user_id}/', response_model=list[UserPreference])
def read_user_preferences(user_id: int, db: Session = Depends(get_db)):
    preferences = UserPreferenceCRUD.get_user_preferences(db, user_id)
    if not preferences:
        raise HTTPException(status_code=404, detail="Preferences not found")
    return preferences