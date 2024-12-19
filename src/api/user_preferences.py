from fastapi import APIRouter, HTTPException
from src.models.user_preferences import UserPreferences

router = APIRouter()

# Sample in-memory data store
user_preferences_db = {}  

@router.post('/preferences/', response_model=UserPreferences)
async def create_user_preferences(user_id: str, preferences: UserPreferences):
    if user_id in user_preferences_db:
        raise HTTPException(status_code=400, detail="Preferences already set for this user.")
    user_preferences_db[user_id] = preferences
    return preferences

@router.get('/preferences/{user_id}', response_model=UserPreferences)
async def get_user_preferences(user_id: str):
    preferences = user_preferences_db.get(user_id)
    if not preferences:
        raise HTTPException(status_code=404, detail="Preferences not found for this user.")
    return preferences