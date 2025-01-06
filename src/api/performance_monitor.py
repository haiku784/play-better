from fastapi import APIRouter, BackgroundTasks
from fastapi.responses import JSONResponse
import time

router = APIRouter()

# Simulated metrics storage
service_metrics = {
    "uptime": 0,
    "request_count": 0,
    "downtime_alerts": []
}

@router.on_event("startup")
async def monitor_service():
    while True:
        # Simulate uptime calculation
        service_metrics["uptime"] += 1
        # Add any conditions for downtime alerts
        if service_metrics["uptime"] % 5 == 0:  # Simulate a downtime alert every 5 seconds
            service_metrics["downtime_alerts"].append(f"Downtime alert at {time.strftime('%Y-%m-%d %H:%M:%S')}.")
        await asyncio.sleep(1)

@router.get("/metrics")
async def get_metrics():
    return JSONResponse(content=service_metrics)
