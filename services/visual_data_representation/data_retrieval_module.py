from fastapi import APIRouter, HTTPException
from typing import Optional, Dict, Any

router = APIRouter()

# Mocked database retrieval function for demonstration purposes
def mock_database_retrieval(match_id: str) -> Dict[str, Any]:
    # Simulating data retrieval logic
    return {'matchId': match_id, 'score': 3, 'opponent': 'Team B', 'date': '2025-01-20'}

@router.post('/api/visualization/data')
async def get_match_data(matchId: str):
    if not matchId:
        raise HTTPException(status_code=400, detail="matchId is required")
    match_data = mock_database_retrieval(matchId)
    return {'matchData': match_data, 'error': None}