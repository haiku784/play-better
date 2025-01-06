from fastapi import APIRouter, HTTPException
from typing import List
from src.models.gameplay_session import GameplaySession, GameplayEvent

router = APIRouter()

# Simulated database for storing gameplay sessions
DATABASE = []

@router.post('/gameplay_sessions/', response_model=GameplaySession)
def create_gameplay_session(session: GameplaySession):
    """Creates a new gameplay session and stores it in the simulated database."""
    DATABASE.append(session)
    return session

@router.get('/gameplay_sessions/', response_model=List[GameplaySession])
def get_gameplay_sessions():
    """Retrieves all gameplay sessions from the database."""
    return DATABASE

@router.get('/gameplay_sessions/{session_id}', response_model=GameplaySession)
def get_gameplay_session(session_id: str):
    """Retrieves a single gameplay session by its ID."""
    session = next((s for s in DATABASE if s.session_id == session_id), None)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session
