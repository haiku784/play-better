from fastapi import FastAPI"nfrom pydantic import BaseModel
from pymongo import MongoClient

app = FastAPI()
client = MongoClient('mongodb://localhost:27017')
db = client['mydatabase']

class DataModel(BaseModel):
    data: str

@app.post('/api/data/')
async def create_data(item: DataModel):
    db.collection.insert_one(item.dict())
    return {'message': 'Data stored successfully!'}
