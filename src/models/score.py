from pydantic import BaseModel

class Score(BaseModel):
    player_id: int
    game_id: int
    score_value: int
    date: str

    class Config:
        orm_mode = True
