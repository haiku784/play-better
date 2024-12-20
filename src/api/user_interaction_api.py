from fastapi import FastAPI, Depends
from fastapi.responses import JSONResponse
from .performance_profiler import PerformanceProfiler

app = FastAPI()

@app.post("/user-action/")
async def user_interaction(action: str):
    profiler = PerformanceProfiler()
    with profiler.profile(action):
        # Simulate performing the user action
        # Replace with actual action logic
        return JSONResponse(content={"status": "success", "action": action})
