from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any

router = APIRouter()

# Mocked chart generation function for demonstration purposes
def mock_generate_chart(data: List[Dict[str, Any]], visualization_type: str) -> str:
    # Simulating chart generation logic
    return f"https://example.com/charts/{visualization_type}/{data[0]['matchId']}"

@router.post('/api/visualization/data')
async def generate_chart(data: List[Dict[str, Any]], visualizationType: str):
    if not data or not visualizationType:
        raise HTTPException(status_code=400, detail="Data and visualizationType are required")
    chart_url = mock_generate_chart(data, visualizationType)
    return {'chartUrl': chart_url, 'error': None}