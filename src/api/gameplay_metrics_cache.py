from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.decorator import cache
import aioredis

app = FastAPI()

# Initialize Redis for caching
@app.on_event('startup')
async def startup():
    redis = await aioredis.from_url('redis://localhost')
    FastAPICache.init(RedisBackend(redis), prefix='cache')

@app.get('/gameplay_metrics/{user_id}')
@cache(expire=60)  # Cache for 60 seconds
async def get_cached_gameplay_metrics(user_id: str):
    metrics = await get_gameplay_metrics(user_id)  # Call to previously defined DB retrieval function
    if not metrics:
        raise HTTPException(status_code=404, detail='Metrics not found')
    return metrics
