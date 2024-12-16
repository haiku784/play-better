from fastapi import FastAPI, Depends
from fastapi.responses import JSONResponse
from redis import Redis
import json

app = FastAPI()

# Redis client
redis_client = Redis(host='localhost', port=6379, db=0)

def cache_response(key: str):
    def decorator(func):
        async def wrapper(*args, **kwargs):
            # Check if the response is in cache
            cached_response = redis_client.get(key)
            if cached_response:
                # Return cached response if exists
                return JSONResponse(content=json.loads(cached_response))
            response = await func(*args, **kwargs)
            # Cache response for future requests
            redis_client.set(key, json.dumps(response.body), ex=3600)  # Cache for 1 hour
            return response
        return wrapper
    return decorator

@app.get("/items/{item_id}")
@cache_response("item_{item_id}")  # Cache the response for item requests
async def read_item(item_id: int):
    # Simulate a database call
    return {"item_id": item_id, "name": "Item Name"}