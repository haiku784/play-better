from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

# Initialize FastAPI application
app = FastAPI()

# Define a model for user weaknesses
class UserWeaknesses(BaseModel):
    weaknesses: List[str]

# Define a model for suggested practice routines
class PracticeRoutine(BaseModel):
    routine: List[str]

# Dummy data for practice routines based on weaknesses
practice_routines = {
    "shooting": ["Drill A: 100 free throws", "Drill B: Layup practice"],
    "defense": ["Drill C: 1-on-1 defensive drills", "Drill D: Slide drills"],
    "passing": ["Drill E: Short passing drills", "Drill F: Long passing drills"]
}

@app.post("/suggest-routine/", response_model=PracticeRoutine)
async def suggest_routine(weaknesses: UserWeaknesses):
    suggested_routine = []
    # Loop through weaknesses to build a routine
    for weakness in weaknesses.weaknesses:
        if weakness in practice_routines:
            suggested_routine.extend(practice_routines[weakness])
        else:
            raise HTTPException(status_code=404, detail=f"No routines found for weakness: {weakness}")
    return PracticeRoutine(routine=suggested_routine)
