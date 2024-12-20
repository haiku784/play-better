from fastapi import APIRouter
from .performance_metrics_extractor import PerformanceMetricsExtractor

router = APIRouter()
metrics_extractor = PerformanceMetricsExtractor()

@router.get('/metrics/average-latency')
async def average_latency():
    """Endpoint to get the average latency of requests"""
    return {"average_latency": metrics_extractor.get_average_latency()}

@router.get('/metrics/throughput')
async def throughput():
    """Endpoint to get the throughput of requests"""
    return {"throughput": metrics_extractor.get_throughput()}

