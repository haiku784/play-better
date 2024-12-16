import redis

# Connect to Redis
redis_client = redis.StrictRedis(
    host='localhost',
    port=6379,
    db=0
)

# Clear all cache
def clear_cache():
    redis_client.flushdb()  # Clear the current database
    print("Cache cleared!")

if __name__ == '__main__':
    clear_cache()