from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

# Sample User Gameplay Data Model
class UserGameplayData(BaseModel):
    user_id: int
    game_id: int
    score: int
    duration: int  # Duration in seconds
    level: int  # Level reached

# Sample Database (in-memory for demonstration)
USER_GAMER_DATA = [
    UserGameplayData(user_id=1, game_id=101, score=1500, duration=3600, level=10),
    UserGameplayData(user_id=1, game_id=102, score=2000, duration=5400, level=15),
    UserGameplayData(user_id=2, game_id=101, score=1200, duration=1800, level=8),
]

app = FastAPI()

@app.get('/user/{user_id}/gameplay', response_model=List[UserGameplayData])
async def get_user_gameplay(user_id: int):
    # Fetch gameplay data for the given user_id
    user_data = [data for data in USER_GAMER_DATA if data.user_id == user_id]
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found or has no gameplay data.")
    return user_data
