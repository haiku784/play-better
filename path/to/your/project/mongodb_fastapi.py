from fastapi import FastAPI
from pymongo import MongoClient

app = FastAPI()

# MongoDB connection
client = MongoClient('mongodb://localhost:27017')
db = client.test_database

@app.get('/test_query')
async def test_query():
    test_collection = db.test_collection
    result = test_collection.find_one()
    return {'result': result}