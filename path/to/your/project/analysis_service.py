from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from sqlalchemy.exc import IntegrityError
from typing import List, Optional

# Database setup
DATABASE_URL = "postgresql://user:password@localhost/dbname"
engine = create_engine(DATABASE_URL)
Base = declarative_base()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Models
class PerformanceMetric(Base):
    __tablename__ = "performance_metrics"
    metric_id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("gameplay_sessions.session_id"), nullable=False)
    kills = Column(Integer, nullable=False)
    deaths = Column(Integer, nullable=False)
    assists = Column(Integer, nullable=False)
    accuracy = Column(Integer, nullable=False)

    def __repr__(self):
        return f"<PerformanceMetric(session_id={self.session_id}, kills={self.kills}, deaths={self.deaths}, assists={self.assists}, accuracy={self.accuracy})>"

# Create the database tables
Base.metadata.create_all(bind=engine)

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
@app.post("/performance_metrics/", response_model=PerformanceMetric)
def create_performance_metric(metric: PerformanceMetric, db: Session = Depends(get_db)):
    try:
        db.add(metric)
        db.commit()
        db.refresh(metric)
        return metric
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Integrity error occurred")

@app.get("/performance_metrics/{metric_id}", response_model=PerformanceMetric)
def read_performance_metric(metric_id: int, db: Session = Depends(get_db)):
    metric = db.query(PerformanceMetric).filter(PerformanceMetric.metric_id == metric_id).first()
    if metric is None:
        raise HTTPException(status_code=404, detail="PerformanceMetric not found")
    return metric

@app.get("/performance_metrics/", response_model=List[PerformanceMetric])
def read_performance_metrics(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    metrics = db.query(PerformanceMetric).offset(skip).limit(limit).all()
    return metrics

@app.delete("/performance_metrics/{metric_id}")
def delete_performance_metric(metric_id: int, db: Session = Depends(get_db)):
    metric = db.query(PerformanceMetric).filter(PerformanceMetric.metric_id == metric_id).first()
    if metric is None:
        raise HTTPException(status_code=404, detail="PerformanceMetric not found")
    db.delete(metric)
    db.commit()
    return {"detail": "PerformanceMetric deleted successfully"}

