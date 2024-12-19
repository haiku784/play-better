from pydantic import BaseModel

class GameplayData(BaseModel):
    player_id: str  # Unique identifier for the player
    score: int      # The score achieved by the player
    level: int      # The level reached during gameplay
    actions: list   # List of actions performed by the player
