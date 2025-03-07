from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, Session
from pydantic import BaseModel

# Database configuration
DATABASE_URL = "postgresql://user:password@localhost/dbname"

# SQLAlchemy setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    recommendations = relationship("Recommendation", back_populates="user")

class Recommendation(Base):
    __tablename__ = "recommendations"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    hardware_recommendations = Column(String)
    config_recommendations = Column(String)
    user = relationship("User", back_populates="recommendations")

# Pydantic schemas
class RecommendationCreate(BaseModel):
    user_id: int
    hardware_recommendations: str
    config_recommendations: str

class RecommendationResponse(BaseModel):
    id: int
    user_id: int
    hardware_recommendations: str
    config_recommendations: str

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
@app.post("/recommendations/", response_model=RecommendationResponse)
def create_recommendation(recommendation: RecommendationCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == recommendation.user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db_recommendation = Recommendation(**recommendation.dict())
    db.add(db_recommendation)
    db.commit()
    db.refresh(db_recommendation)
    return db_recommendation

@app.get("/recommendations/{user_id}/", response_model=list[RecommendationResponse])
def get_recommendations(user_id: int, db: Session = Depends(get_db)):
    recommendations = db.query(Recommendation).filter(Recommendation.user_id == user_id).all()
    return recommendations

# Create the database tables
Base.metadata.create_all(bind=engine)