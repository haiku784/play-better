from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

# Create FastAPI instance
app = FastAPI()

# Sample data structure to hold gameplay analysis
class GameplayAnalysis(BaseModel):
    user_id: int
    game_id: int
    analysis_data: dict

# In-memory storage for user gameplay analysis data
fake_db = []

@app.post("/gameplay-analysis/", response_model=GameplayAnalysis)
async def create_gameplay_analysis(analysis: GameplayAnalysis):
    # Simulating database save operation
    fake_db.append(analysis)
    return analysis

@app.get("/gameplay-analysis/{user_id}", response_model=List[GameplayAnalysis])
async def get_user_gameplay_analysis(user_id: int):
    # Fetch gameplay analysis for a specific user
    user_analysis = [data for data in fake_db if data.user_id == user_id]
    if not user_analysis:
        raise HTTPException(status_code=404, detail="User gameplay analysis not found")
    return user_analysis