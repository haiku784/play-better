from fastapi import FastAPI, Request
from starlette.middleware.base import BaseHTTPMiddleware
import redis

class CachingMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: FastAPI, redis_client: redis.Redis):
        super().__init__(app)
        self.redis_client = redis_client

    async def dispatch(self, request: Request, call_next):
        # Check if the response is cached
        cache_key = request.url.path
        cached_response = self.redis_client.get(cache_key)
        if cached_response:
            return cached_response

        # No cached response, proceed with request
        response = await call_next(request)
        # Cache the response
        self.redis_client.set(cache_key, response.body)
        return response
