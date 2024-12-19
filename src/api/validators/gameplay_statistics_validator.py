from pydantic import BaseModel, conint, validator
from typing import List, Optional

class GameplayStatistics(BaseModel):
    player_id: str
    game_id: str
    score: conint(ge=0)  # Score must be a non-negative integer
    gameplay_time: conint(gt=0)  # Gameplay time must be greater than 0
    levels_completed: conint(ge=0)  # Levels completed must be a non-negative integer
    achievements: Optional[List[str]] = []  # Optional list of achievements

    @validator('player_id')
    def check_player_id(cls, v):
        if len(v) < 3:
            raise ValueError('Player ID must be at least 3 characters long')
        return v

    @validator('game_id')
    def check_game_id(cls, v):
        if len(v) < 3:
            raise ValueError('Game ID must be at least 3 characters long')
        return v

# Example usage:
# stats = GameplayStatistics(player_id='P123', game_id='G123', score=100, gameplay_time=60, levels_completed=3)
