from pydantic import BaseModel

class GameplayStatistics(BaseModel):
    player_id: str
    total_games: int
    wins: int
    losses: int
    average_score: float
    """Model to represent gameplay statistics for players.""