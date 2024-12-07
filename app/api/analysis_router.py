from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models import GameplaySession
from database import get_db

router = APIRouter()

@router.post('/sessions/')
def create_session(session: GameplaySession, db: Session = Depends(get_db)):
    db.add(session)
    db.commit()
    db.refresh(session)
    return session

@router.get('/sessions/{session_id}/')
def get_session(session_id: int, db: Session = Depends(get_db)):
    return db.query(GameplaySession).filter(GameplaySession.id == session_id).first()