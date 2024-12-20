from fastapi import APIRouter, HTTPException, Depends
from .models import UserPreference
from .schemas import UserPreferences
from .database import get_db
from sqlalchemy.orm import Session

router = APIRouter()

@router.put('/user/preferences', response_model=UserPreferences)
async def update_user_preferences(preference: UserPreferences, db: Session = Depends(get_db)):
    # Check if the user has the preference already
    existing_preference = db.query(UserPreference).filter(UserPreference.key == preference.preference_key).first()
    if existing_preference:
        # Update the existing preference
        existing_preference.value = preference.preference_value
        db.commit()
        return preference
    else:
        raise HTTPException(status_code=404, detail="Preference not found")