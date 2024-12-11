from fastapi import FastAPI
from models import User, Game, Recording
from database import init_db

app = FastAPI()

# Initialize the database
init_db()

@app.get("/games/")
async def get_games():
    return {"games": "List of e-sport titles"}  # Placeholder implementation

@app.post("/recording/")
async def create_recording(recording: Recording):
    return {"status": "Recording created"}  # Placeholder implementation
