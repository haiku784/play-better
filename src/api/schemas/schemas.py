from pydantic import BaseModel

class GameplayAnalysisSchema(BaseModel):
    score: int
    win_rate: float

    class Config:
        orm_mode = True