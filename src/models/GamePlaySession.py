from pydantic import BaseModel

class GameplaySession(BaseModel):
    id: str
    player_id: str
    game_id: str
    duration: int  # Duration in seconds
    timestamp: str  # ISO formatted timestamp
    score: float

    class Config:
        orm_mode = True