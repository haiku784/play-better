from sqlalchemy.orm import Session
from .models import GameplayRecording

# Create new gameplay recording
def create_gameplay_recording(db: Session, player_name: str, score: int, duration: int):
    new_record = GameplayRecording(player_name=player_name, score=score, duration=duration)
    db.add(new_record)
    db.commit()
    db.refresh(new_record)
    return new_record

# Get all gameplay recordings
def get_gameplay_recordings(db: Session):
    return db.query(GameplayRecording).all()