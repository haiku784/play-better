from fastapi import FastAPI
from .api.recording_api import router as recording_router

app = FastAPI()

# Include the recording router
app.include_router(recording_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Welcome to the Recording Service API"}