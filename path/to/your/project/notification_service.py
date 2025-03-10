from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
from sqlalchemy.exc import IntegrityError
import datetime

# Database setup
DATABASE_URL = "postgresql://user:password@localhost/dbname"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class Reminder(Base):
    __tablename__ = "reminders"
    reminder_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.user_id'))
    type = Column(String, index=True)
    date_time = Column(DateTime, index=True)
    frequency = Column(String)

    user = relationship("User")  # Assuming User model exists

# Pydantic Schemas
class ReminderCreate(BaseModel):
    user_id: int
    type: str
    date_time: datetime.datetime
    frequency: str

class ReminderResponse(BaseModel):
    reminder_id: int
    user_id: int
    type: str
    date_time: datetime.datetime
    frequency: str

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

# API Routes
@app.post("/reminders/", response_model=ReminderResponse)
def create_reminder(reminder: ReminderCreate, db: Session = Depends(get_db)):
    db_reminder = Reminder(**reminder.dict())
    db.add(db_reminder)
    try:
        db.commit()
        db.refresh(db_reminder)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="User not found")
    return db_reminder

@app.get("/reminders/{reminder_id}", response_model=ReminderResponse)
def read_reminder(reminder_id: int, db: Session = Depends(get_db)):
    reminder = db.query(Reminder).filter(Reminder.reminder_id == reminder_id).first()
    if reminder is None:
        raise HTTPException(status_code=404, detail="Reminder not found")
    return reminder

@app.delete("/reminders/{reminder_id}")
def delete_reminder(reminder_id: int, db: Session = Depends(get_db)):
    reminder = db.query(Reminder).filter(Reminder.reminder_id == reminder_id).first()
    if reminder is None:
        raise HTTPException(status_code=404, detail="Reminder not found")
    db.delete(reminder)
    db.commit()
    return {"detail": "Reminder deleted successfully"}

# Create database tables
Base.metadata.create_all(bind=engine)