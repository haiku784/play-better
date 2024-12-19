from pydantic import BaseModel

class PlayerScore(BaseModel):
    player_id: str
    score: int
    timestamp: str
    """Model to represent player scores.""