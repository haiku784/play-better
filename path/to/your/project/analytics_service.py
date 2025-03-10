from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, Float, DateTime, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime

# Database configuration
DATABASE_URL = "postgresql://user:password@localhost/dbname"

# SQLAlchemy setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Model for Health Data
class HealthData(Base):
    __tablename__ = "health_data"
    id = Column(Integer, primary_key=True, index=True)
    value = Column(Float, nullable=False)
    unit = Column(String, nullable=False)
    date_recorded = Column(DateTime, default=datetime.utcnow)

# Create the database tables
Base.metadata.create_all(bind=engine)

# FastAPI app
app = FastAPI()

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# API route to create health data
@app.post("/healthdata/", response_model=dict)
def create_health_data(value: float, unit: str, db: Session = Depends(get_db)):
    if value < 0:
        raise HTTPException(status_code=400, detail="Value must be non-negative")
    health_data = HealthData(value=value, unit=unit)
    db.add(health_data)
    db.commit()
    db.refresh(health_data)
    return {"id": health_data.id, "value": health_data.value, "unit": health_data.unit, "date_recorded": health_data.date_recorded}

# API route to get health data by ID
@app.get("/healthdata/{health_data_id}/", response_model=dict)
def get_health_data(health_data_id: int, db: Session = Depends(get_db)):
    health_data = db.query(HealthData).filter(HealthData.id == health_data_id).first()
    if health_data is None:
        raise HTTPException(status_code=404, detail="Health data not found")
    return {"id": health_data.id, "value": health_data.value, "unit": health_data.unit, "date_recorded": health_data.date_recorded}

# API route to get all health data
@app.get("/healthdata/", response_model=list)
def get_all_health_data(db: Session = Depends(get_db)):
    return db.query(HealthData).all()