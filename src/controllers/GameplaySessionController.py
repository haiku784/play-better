from fastapi import APIRouter, HTTPException
from typing import List
from ..models.GameplaySession import GameplaySession
from ..services.gameplay_analysis_service import GameplayAnalysisService

router = APIRouter()

# Dependency injection of the analysis service
analysis_service = GameplayAnalysisService()

@router.get("/gameplay_sessions/{session_id}", response_model=GameplaySession)
async def get_gameplay_session(session_id: str):
    session = analysis_service.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session

@router.get("/gameplay_sessions", response_model=List[GameplaySession])
async def get_all_gameplay_sessions():
    return analysis_service.get_all_sessions()

@router.post("/gameplay_sessions", response_model=GameplaySession)
async def create_gameplay_session(session: GameplaySession):
    return analysis_service.create_session(session)

@router.delete("/gameplay_sessions/{session_id}", response_model=dict)
async def delete_gameplay_session(session_id: str):
    result = analysis_service.delete_session(session_id)
    if not result:
        raise HTTPException(status_code=404, detail="Session not found")
    return {"detail": "Session deleted successfully"}