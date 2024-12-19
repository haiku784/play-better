from fastapi import APIRouter, HTTPException
from typing import List
from src.models.player import PlayerScore

router = APIRouter()

@router.get('/player_scores/{player_id}', response_model=List[PlayerScore])
async def get_player_scores(player_id: str):
    """Fetches player scores by player ID."""
    try:
        # Fetch scores from the database or service layer
        scores = await PlayerScore.get_scores_by_player_id(player_id)
        if not scores:
            raise HTTPException(status_code=404, detail="Player not found or no scores available")
        return scores
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
