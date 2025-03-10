from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime

# Database setup
DATABASE_URL = "postgresql://user:password@localhost/dbname"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class HealthRecord(Base):
    __tablename__ = "health_records"
    record_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    record_type = Column(String, index=True)
    content = Column(String)
    date_created = Column(DateTime, default=datetime.utcnow)
    date_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# Pydantic schemas
class HealthRecordCreate(BaseModel):
    user_id: int
    record_type: str
    content: str

class HealthRecordResponse(BaseModel):
    record_id: int
    user_id: int
    record_type: str
    content: str
    date_created: datetime
    date_updated: datetime

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

# CRUD operations
@app.post("/health_records/", response_model=HealthRecordResponse)
def create_health_record(record: HealthRecordCreate, db: Session = Depends(get_db)):
    db_record = HealthRecord(**record.dict())
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record

@app.get("/health_records/{record_id}", response_model=HealthRecordResponse)
def read_health_record(record_id: int, db: Session = Depends(get_db)):
    db_record = db.query(HealthRecord).filter(HealthRecord.record_id == record_id).first()
    if db_record is None:
        raise HTTPException(status_code=404, detail="Health record not found")
    return db_record

@app.put("/health_records/{record_id}", response_model=HealthRecordResponse)
def update_health_record(record_id: int, record: HealthRecordCreate, db: Session = Depends(get_db)):
    db_record = db.query(HealthRecord).filter(HealthRecord.record_id == record_id).first()
    if db_record is None:
        raise HTTPException(status_code=404, detail="Health record not found")
    for key, value in record.dict().items():
        setattr(db_record, key, value)
    db.commit()
    db.refresh(db_record)
    return db_record

@app.delete("/health_records/{record_id}")
def delete_health_record(record_id: int, db: Session = Depends(get_db)):
    db_record = db.query(HealthRecord).filter(HealthRecord.record_id == record_id).first()
    if db_record is None:
        raise HTTPException(status_code=404, detail="Health record not found")
    db.delete(db_record)
    db.commit()
    return {"detail": "Health record deleted successfully"}

# Unit tests
import pytest
from fastapi.testclient import TestClient

@pytest.fixture
def client():
    return TestClient(app)

def test_create_health_record(client):
    response = client.post("/health_records/", json={"user_id": 1, "record_type": "Allergy", "content": "Peanut allergy"})
    assert response.status_code == 200
    assert response.json()["content"] == "Peanut allergy"


def test_read_health_record(client):
    response = client.get("/health_records/1")
    assert response.status_code == 200


def test_update_health_record(client):
    response = client.put("/health_records/1", json={"user_id": 1, "record_type": "Allergy", "content": "Updated content"})
    assert response.status_code == 200
    assert response.json()["content"] == "Updated content"


def test_delete_health_record(client):
    response = client.delete("/health_records/1")
    assert response.status_code == 200
    assert response.json()["detail"] == "Health record deleted successfully