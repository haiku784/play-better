from pydantic import BaseModel, Field, validator
from typing import List, Optional

class GameplayData(BaseModel):
    player_id: int = Field(..., description="The ID of the player")
    game_id: int = Field(..., description="The ID of the game")
    score: float = Field(..., gt=0, description="The score achieved by the player, must be greater than zero")
    timestamp: str = Field(..., description="The timestamp of when the game was played")
    tags: Optional[List[str]] = Field(default=[], description="Optional list of tags associated with the gameplay")

    @validator('timestamp')
    def validate_timestamp(cls, v):
        # Basic validation for timestamp format (YYYY-MM-DD HH:MM:SS)
        import re
        pattern = r'"d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}'
        if not re.match(pattern, v):
            raise ValueError('Timestamp must be in the format YYYY-MM-DD HH:MM:SS')
        return v

# Example usage:
# gameplay_data = GameplayData(player_id=1, game_id=101, score=150.0, timestamp='2023-10-10 14:30:00')

