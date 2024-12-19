from sqlalchemy.orm import Session
from .models.recording import Recording

def create_recording(db: Session, recording: Recording):
    db_recording = Recording(**recording.dict())
    db.add(db_recording)
    db.commit()
    db.refresh(db_recording)
    return db_recording

def get_recording(db: Session, recording_id: str):
    return db.query(Recording).filter(Recording.recording_id == recording_id).first()
