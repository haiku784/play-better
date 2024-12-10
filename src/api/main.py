from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List
import uvicorn

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    is_offer: bool = None

# In-memory storage for demonstration purposes
fake_db = []

@app.post('/items/', response_model=Item)
async def create_item(item: Item):
    fake_db.append(item)
    return item

@app.get('/items/', response_model=List[Item])
async def read_items():
    return fake_db

# Middleware for performance monitoring
@app.middleware("http")
async def add_process_time_header(request, call_next):
    import time
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers['X-Process-Time'] = str(process_time)
    return response

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)