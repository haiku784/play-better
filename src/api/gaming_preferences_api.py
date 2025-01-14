from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
import datetime

app = FastAPI()

# MongoDB Connection
client = MongoClient('mongodb://localhost:27017/')
db = client['gaming_preferences']
preferences_collection = db['preferences']

class GamingPreferences(BaseModel):
    user_id: str
    favorite_games: List[str]
    play_style: str
    budget: Optional[float] = None
    timestamp: str

@app.post('/submit_preferences/')
async def submit_preferences(preferences: GamingPreferences):
    preferences.timestamp = datetime.datetime.utcnow().isoformat()
    try:
        preferences_collection.insert_one(preferences.dict())
        return {'message': 'Preferences submitted successfully!'}
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail='User ID already exists.')
