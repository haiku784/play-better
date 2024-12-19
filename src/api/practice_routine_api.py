from fastapi import FastAPI, HTTPException, Depends
from fastapi.responses import JSONResponse
from typing import List
from pydantic import BaseModel

# Initialize FastAPI application
app = FastAPI()

# Database model for practice routines
class PracticeRoutine(BaseModel):
    user_id: int
    routine_name: str
    drills: List[str]

# Simulated database (in memory)
fake_db = [
    PracticeRoutine(user_id=1, routine_name="Beginner Routine", drills=["Drill 1", "Drill 2"]),
    PracticeRoutine(user_id=2, routine_name="Advanced Routine", drills=["Drill 3", "Drill 4"])
]

@app.get("/api/practice_routines/{user_id}", response_model=List[PracticeRoutine])
async def get_practice_routines(user_id: int):
    """Fetch personalized practice routines for a user based on user_id."""
    routines = [routine for routine in fake_db if routine.user_id == user_id]
    if not routines:
        raise HTTPException(status_code=404, detail="No routines found for this user.")
    return routines

# Documentation info
@app.get("/docs")
async def get_docs():
    return JSONResponse(content={"message": "API endpoint for fetching personalized practice routines"})