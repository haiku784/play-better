from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .db import crud, models
from .db.database import SessionLocal, engine

# Create FastAPI instance
app = FastAPI()

# Dependency for getting DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/recording/")
async def store_gameplay_recording(player_name: str, score: int, duration: int, db: Session = Depends(get_db)):
    # Store gameplay recording in the database
    record = crud.create_gameplay_recording(db=db, player_name=player_name, score=score, duration=duration)
    return record

@app.get("/recordings/")
async def read_gameplay_recordings(db: Session = Depends(get_db)):
    # Retrieve all gameplay recordings
    recordings = crud.get_gameplay_recordings(db=db)
    return recordings