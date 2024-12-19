from fastapi import APIRouter
from src.models.game import Game
from src.models.player import Player
from src.models.score import Score

router = APIRouter()

@router.post("/game/", response_model=Game)
async def create_game(game: Game):
    return game

@router.post("/player/", response_model=Player)
async def create_player(player: Player):
    return player

@router.post("/score/", response_model=Score)
async def create_score(score: Score):
    return score
