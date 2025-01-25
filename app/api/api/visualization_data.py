from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class VisualizationRequest(BaseModel):
    matchId: str
    visualizationType: str
    timeFrame: str = None

class VisualizationResponse(BaseModel):
    visualizationUrl: str
    message: str = None

@app.post('/api/visualization/data', response_model=VisualizationResponse)
async def visualize_data(request: VisualizationRequest):
    # Call to retrieve match data
    match_data = MatchDataRetrieval.get_match_data(request.matchId)
    # Call to generate visualization
    chart_data = ChartGeneration.generate_chart(match_data, request.visualizationType)
    return {'visualizationUrl': chart_data['chartUrl'], 'message': 'Visualization generated successfully'}
