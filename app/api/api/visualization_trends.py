from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class TrendsRequest(BaseModel):
    category: str
    filterOptions: dict = None

class TrendsResponse(BaseModel):
    trends: list
    message: str = None

@app.get('/api/visualization/trends', response_model=TrendsResponse)
async def get_trends(request: TrendsRequest):
    # Call to retrieve trend data
    trend_data = TrendDataRetrieval.get_trend_data(request.category, request.filterOptions)
    return {'trends': trend_data['trendData'], 'message': 'Trends retrieved successfully'}
