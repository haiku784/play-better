from pydantic import BaseModel, validator, ValidationError

class GameTitlePerformanceValidator(BaseModel):
    game_title: str
    performance_parameters: dict

    @validator('game_title')
    def validate_game_title(cls, v):
        if len(v) == 0:
            raise ValueError('Game title cannot be empty')
        if not isinstance(v, str):
            raise ValueError('Game title must be a string')
        return v

    @validator('performance_parameters')
    def validate_performance_parameters(cls, v):
        if not isinstance(v, dict):
            raise ValueError('Performance parameters must be a dictionary')
        # Add additional performance parameter validations here if necessary
        return v
