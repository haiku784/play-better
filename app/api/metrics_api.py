from fastapi import FastAPI, HTTPException
from sqlalchemy.orm import Session
from models import PerformanceMetrics  # Assuming a model for metrics exists
from database import get_db  # Function to get a database session

app = FastAPI()

@app.get("/metrics/", response_model=List[PerformanceMetrics])
async def get_performance_metrics(db: Session = Depends(get_db)):
    """Fetch performance metrics from the database."""
    try:
        metrics = db.query(PerformanceMetrics).all()  # Query all metrics
        return metrics
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))  # Handle exceptions
