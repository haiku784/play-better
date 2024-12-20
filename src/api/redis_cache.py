import redis

class RedisCache:
    def __init__(self, host='localhost', port=6379, db=0):
        """Initialize Redis client."""
        self.client = redis.StrictRedis(host=host, port=port, db=db)

    def set(self, key, value, expiration=3600):
        """Set a value in the cache with an optional expiration time."""
        self.client.set(key, value, ex=expiration)

    def get(self, key):
        """Get a value from the cache. Returns None if not found."""
        return self.client.get(key)

    def delete(self, key):
        """Delete a value from the cache."""
        self.client.delete(key)
