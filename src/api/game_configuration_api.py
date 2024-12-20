from fastapi import APIRouter, HTTPException
from .models import GameConfiguration

router = APIRouter()

@router.get("/game-configuration/{game_title}")
async def get_game_configuration(game_title: str):
    """
    API endpoint that fetches game configurations based on game title.
    """
    configuration = GameConfiguration.get_by_title(game_title)
    if not configuration:
        raise HTTPException(status_code=404, detail="Configuration not found")
    return configuration
