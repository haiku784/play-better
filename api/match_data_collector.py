from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import datetime

app = FastAPI()

# Define request and response models
class PlayerStat(BaseModel):
    player_id: str
    score: int
    assists: int

class GameEvent(BaseModel):
    event_type: str
    timestamp: str

class CollectMatchDataRequest(BaseModel):
    match_id: str
    player_stats: List[PlayerStat]
    game_events: List[GameEvent]
    timestamp: str

class CollectMatchDataResponse(BaseModel):
    status: str
    message: str
    data_id: Optional[str] = None

class RetrieveMatchDataRequest(BaseModel):
    match_id: str

class RetrieveMatchDataResponse(BaseModel):
    match_id: str
    player_stats: List[PlayerStat]
    game_events: List[GameEvent]
    timestamp: str

# Mock database for storing match data
mock_db = {}

@app.post('/api/matchdata/collect', response_model=CollectMatchDataResponse)
def collect_match_data(request: CollectMatchDataRequest):
    # Generate a unique data ID
    data_id = str(datetime.datetime.now().timestamp())
    mock_db[request.match_id] = request.dict()
    return CollectMatchDataResponse(status="success", message="Data collected successfully", data_id=data_id)

@app.get('/api/matchdata/retrieve', response_model=RetrieveMatchDataResponse)
def retrieve_match_data(match_id: str):
    if match_id not in mock_db:
        raise HTTPException(status_code=404, detail="Match data not found")
    match_data = mock_db[match_id]
    return RetrieveMatchDataResponse(**match_data)
