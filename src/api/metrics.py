from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

# Define a Pydantic model for performance metrics
class PerformanceMetrics(BaseModel):
    metric_name: str
    value: float
    timestamp: str

# In-memory storage for metrics
metrics_db = []

@app.post('/api/performance-metrics')
async def submit_performance_metrics(performance_metrics: PerformanceMetrics):
    """Endpoint to submit performance metrics."""
    metrics_db.append(performance_metrics)
    return {'message': 'Metrics submitted successfully!'}

@app.get('/api/performance-metrics')
async def get_performance_metrics():
    """Endpoint to retrieve all submitted performance metrics."""
    if not metrics_db:
        raise HTTPException(status_code=404, detail='No metrics found')
    return metrics_db