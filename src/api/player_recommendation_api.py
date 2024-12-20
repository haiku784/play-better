from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

# Sample data structure for user profiles
class UserProfile(BaseModel):
    user_id: int
    preferences: dict

# Sample data structure for player recommendations
class PlayerRecommendation(BaseModel):
    player_id: int
    player_name: str
    skill_level: str

# Database mockup (in real application, replace with actual DB calls)
user_profiles_db = {
    1: {'preferences': {'preferred_position': 'Forward', 'skill_level': 'Intermediate'}},
    2: {'preferences': {'preferred_position': 'Defense', 'skill_level': 'Advanced'}}
}

recommendations_db = {
    'Forward': [
        PlayerRecommendation(player_id=1, player_name='John Doe', skill_level='Intermediate'),
        PlayerRecommendation(player_id=2, player_name='Jane Smith', skill_level='Advanced')
    ],
    'Defense': [
        PlayerRecommendation(player_id=3, player_name='Alex Johnson', skill_level='Advanced')
    ]
}

@app.get("/recommendations/{user_id}", response_model=list[PlayerRecommendation])
async def get_recommendations(user_id: int):
    # Fetch user profile
    user_profile = user_profiles_db.get(user_id)
    if not user_profile:
        raise HTTPException(status_code=404, detail="User not found")

    # Fetch recommendations based on user preferences
    preferred_position = user_profile['preferences'].get('preferred_position')
    recommendations = recommendations_db.get(preferred_position, [])
    return recommendations
