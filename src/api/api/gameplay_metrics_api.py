from fastapi import APIRouter, HTTPException
from typing import List
from src.database.database import get_metrics_from_db
from src.database.gameplay_metrics_schema import GameplayMetricsSchema

router = APIRouter()

# API endpoint to retrieve gameplay metrics
@router.get('/get-metrics/{user_id}', response_model=List[GameplayMetricsSchema])
async def get_metrics(user_id: str, limit: int = 10, skip: int = 0):
    try:
        metrics = await get_metrics_from_db(user_id, limit, skip)
        if not metrics:
            raise HTTPException(status_code=404, detail="Metrics not found")
        return metrics
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))