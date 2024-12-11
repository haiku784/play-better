from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, EmailStr, constr
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# Database configuration
DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# User settings model
class UserSettings(Base):
    __tablename__ = 'user_settings'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    notification_preference = Column(String)

# Create the database tables
Base.metadata.create_all(bind=engine)

# Pydantic model for input validation
class UserSettingsCreate(BaseModel):
    username: constr(min_length=3, max_length=50)
    email: EmailStr
    notification_preference: constr(regex='^(email|sms|none)$')  # Only allow specific values

app = FastAPI()

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Route to create user settings
@app.post("/settings/", response_model=UserSettingsCreate)
def create_user_settings(settings: UserSettingsCreate, db: Session = Depends(get_db)):
    db_settings = UserSettings(**settings.dict())
    db.add(db_settings)
    db.commit()
    db.refresh(db_settings)
    return db_settings

# Route to get user settings
@app.get("/settings/{username}")
def read_user_settings(username: str, db: Session = Depends(get_db)):
    settings = db.query(UserSettings).filter(UserSettings.username == username).first()
    if settings is None:
        raise HTTPException(status_code=404, detail="User settings not found")
    return settings
