from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()

# Model for user preferences
class UserPreferences(BaseModel):
    skill_level: str
    preferred_gear_types: List[str]

# Model for gameplay data
class GameplayData(BaseModel):
    wins: int
    losses: int
    favorite_weapon: str

# Sample gear database, could be replaced with a real database
gear_database = [
    {'type': 'helmet', 'skill_level': 'beginner', 'gear_name': 'Basic Helmet'},
    {'type': 'armor', 'skill_level': 'beginner', 'gear_name': 'Leather Armor'},
    {'type': 'helmet', 'skill_level': 'advanced', 'gear_name': 'Titanium Helmet'},
    {'type': 'armor', 'skill_level': 'advanced', 'gear_name': 'Combat Armor'},
]

@app.post("/recommend_gear/", response_model=Dict[str, List[str]])
async def recommend_gear(user_preferences: UserPreferences, gameplay_data: GameplayData):
    recommended_gear = []
    # Filter gear based on user's skill level and preferred gear types
    for gear in gear_database:
        if gear['skill_level'] == user_preferences.skill_level and gear['type'] in user_preferences.preferred_gear_types:
            recommended_gear.append(gear['gear_name'])

    if not recommended_gear:
        raise HTTPException(status_code=404, detail="No gear found matching your preferences")

    return {'recommended_gear': recommended_gear}
