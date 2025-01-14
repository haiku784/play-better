from fastapi import APIRouter, HTTPException
from typing import List
from models import GameplaySession

router = APIRouter()

@router.get('/sessions', response_model=List[GameplaySession])
async def get_sessions(user_id: str):
    """Fetch recorded gameplay sessions for a specific user."""
    sessions = await fetch_sessions_from_db(user_id)  # Mocked DB fetch function
    if sessions is None:
        raise HTTPException(status_code=404, detail="Sessions not found.")
    return sessions