from pydantic import BaseModel

class UserPreferences(BaseModel):
    game_style: str
    favorite_game: str
