from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, Session

# Database setup
DATABASE_URL = "postgresql://user:password@localhost/dbname"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class GameplaySession(Base):
    __tablename__ = "gameplay_sessions"
    session_id = Column(Integer, primary_key=True, index=True)
    game_title = Column(String, index=True)
    duration = Column(Integer)
    recorded_data = Column(Text)
    tags = Column(String)

    def __repr__(self):
        return f"<GameplaySession(session_id={self.session_id}, game_title='{self.game_title}')>"

# Pydantic schemas
class GameplaySessionCreate(BaseModel):
    game_title: str
    duration: int
    recorded_data: str
    tags: str

class GameplaySessionResponse(BaseModel):
    session_id: int
    game_title: str
    duration: int
    recorded_data: str
    tags: str

    class Config:
        orm_mode = True

# FastAPI app
app = FastAPI()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# API routes
@app.post("/recording/start", response_model=GameplaySessionResponse)
def start_recording(session: GameplaySessionCreate, db: Session = Depends(get_db)):
    db_session = GameplaySession(**session.dict())
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session

@app.get("/recording/{session_id}", response_model=GameplaySessionResponse)
def get_recording(session_id: int, db: Session = Depends(get_db)):
    db_session = db.query(GameplaySession).filter(GameplaySession.session_id == session_id).first()
    if db_session is None:
        raise HTTPException(status_code=404, detail="Session not found")
    return db_session

@app.delete("/recording/{session_id}")
def delete_recording(session_id: int, db: Session = Depends(get_db)):
    db_session = db.query(GameplaySession).filter(GameplaySession.session_id == session_id).first()
    if db_session is None:
        raise HTTPException(status_code=404, detail="Session not found")
    db.delete(db_session)
    db.commit()
    return {"detail": "Session deleted successfully"}

# Create the database tables
Base.metadata.create_all(bind=engine)