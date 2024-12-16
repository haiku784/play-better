from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, Field

app = FastAPI()

class GameplayData(BaseModel):
    player_id: int = Field(..., description="The ID of the player")
    game_id: int = Field(..., description="The ID of the game")
    score: float = Field(..., gt=0, description="The score must be a positive number")
    timestamp: str = Field(..., description="The timestamp of the gameplay in ISO format")

@app.post('/gameplay-analysis')
async def analyze_gameplay(data: GameplayData):
    # Perform analysis on the gameplay data
    return {"message": "Gameplay data is valid and processed."}

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.detail},
    )
