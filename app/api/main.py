from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Dummy data for recordings
recordings = [
    {"id": 1, "title": "Recording 1", "duration": "3:45"},
    {"id": 2, "title": "Recording 2", "duration": "4:20"}
]

# Model for performance data
class PerformanceData(BaseModel):
    id: int
    score: float
    comments: str

# Dummy data for performance metrics
performance_data = [
    PerformanceData(id=1, score=95.5, comments="Excellent performance"),
    PerformanceData(id=2, score=88.0, comments="Good but needs improvement")
]

@app.get("/api/recordings")
async def get_recordings():
    """ Retrieve a list of recordings """
    return recordings

@app.get("/api/performance")
async def get_performance():
    """ Retrieve performance data """
    return performance_data
