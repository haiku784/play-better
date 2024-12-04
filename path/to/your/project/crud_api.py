from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient

app = FastAPI()

# MongoDB connection
client = AsyncIOMotorClient('mongodb://localhost:27017')
db = client.mydatabase

class Item(BaseModel):
    name: str
    description: str
    price: float

@app.post('/items/', response_model=Item)
async def create_item(item: Item):
    result = await db.items.insert_one(item.dict())
    item.id = str(result.inserted_id)
    return item

@app.get('/items/{item_id}', response_model=Item)
async def read_item(item_id: str):
    item = await db.items.find_one({'_id': item_id})
    if item is None:
        raise HTTPException(status_code=404, detail='Item not found')
    return item

@app.put('/items/{item_id}', response_model=Item)
async def update_item(item_id: str, item: Item):
    result = await db.items.update_one({'_id': item_id}, {'$set': item.dict()})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail='Item not found')
    return item

@app.delete('/items/{item_id}', response_model=dict)
async def delete_item(item_id: str):
    result = await db.items.delete_one({'_id': item_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail='Item not found')
    return {'status': 'Item deleted'}