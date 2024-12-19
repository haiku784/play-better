from pydantic import BaseModel

class Game(BaseModel):
    id: int
    title: str
    genre: str
    release_year: int

    class Config:
        orm_mode = True
