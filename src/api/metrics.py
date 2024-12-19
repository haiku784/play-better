from fastapi import FastAPI
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI()

# Initialize the instrumentator for Prometheus
instrumentator = Instrumentator()

# Middleware to track metrics
@instrumentator.instrument()
def metrics():
    return "Metrics endpoint"

@app.get("/metrics")
async def get_metrics():
    return metrics()
