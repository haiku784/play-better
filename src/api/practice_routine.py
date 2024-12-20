from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

class PracticeRoutine(BaseModel):
    routine_name: str
    exercises: List[str]

# This endpoint generates practice routines based on the provided performance metrics
@app.post("/generate_routine", response_model=List[PracticeRoutine])
async def generate_routine(performance_metrics: dict):
    """ Generate a list of practice routines based on input performance metrics. 
    Args:
        performance_metrics (dict): A dictionary containing performance metrics.
    Returns:
        List[PracticeRoutine]: A list of generated practice routines.
    """
    try:
        # Logic to generate practice routines goes here
        routines = []  # Placeholder for generated routines
        # Example routine generation logic
        if performance_metrics.get('speed') < 70:
            routines.append(PracticeRoutine(routine_name="Speed Improvement", exercises=["Sprint 100m", "Interval Training"]))
        if performance_metrics.get('accuracy') < 75:
            routines.append(PracticeRoutine(routine_name="Accuracy Drills", exercises=["Target Practice", "Controlled Shot"]))
        return routines
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))