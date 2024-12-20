from fastapi import FastAPI
from .metrics.performance_metrics_extractor import router as metrics_router
from .middleware.logging_middleware import LoggingMiddleware

app = FastAPI()

# Add logging middleware
app.add_middleware(LoggingMiddleware)

# Include performance metrics router
app.include_router(metrics_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Welcome to the performance monitoring service!"}
