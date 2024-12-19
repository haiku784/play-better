from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from typing import List

app = FastAPI()

# Define a Pydantic model for the gameplay data structure
class GameplayData(BaseModel):
    player_id: str
    score: int
    level: int
    timestamp: str

# Simulated database storage
game_data_storage: List[GameplayData] = []

@app.post("/gameplay-data/", response_model=GameplayData)
async def parse_and_store_gameplay_data(data: GameplayData):
    """
    Parses incoming gameplay data and stores it in the simulated database.
    Args:
        data (GameplayData): The gameplay data to parse and store.
    Returns:
        GameplayData: The stored gameplay data.
    Raises:
        HTTPException: If data storage fails.
    """
    try:
        # Simulate data storage
        game_data_storage.append(data)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))