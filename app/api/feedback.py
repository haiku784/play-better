from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# Database setup
DATABASE_URL = 'sqlite:///./feedback.db'
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Feedback model
class Feedback(Base):
    __tablename__ = 'feedback'
    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String, index=True)
    suggestion = Column(String)

# Create the database table
Base.metadata.create_all(bind=engine)

# Pydantic model for input validation
class FeedbackCreate(BaseModel):
    user_name: str
    suggestion: str

app = FastAPI()

@app.post('/feedback/', response_model=FeedbackCreate)
async def submit_feedback(feedback: FeedbackCreate, db: Session = SessionLocal()):
    db_feedback = Feedback(user_name=feedback.user_name, suggestion=feedback.suggestion)
    db.add(db_feedback)
    db.commit()
    db.refresh(db_feedback)
    return db_feedback

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()