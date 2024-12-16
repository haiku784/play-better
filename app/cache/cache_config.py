import redis

# Configure Redis connection
redis_client = redis.StrictRedis(
    host='localhost',  # Redis server host
    port=6379,         # Redis server port
    db=0,              # Database number
    decode_responses=True  # Automatically decode responses to strings
)

# Check connection
try:
    redis_client.ping()
    print("Connected to Redis!")
except redis.ConnectionError:
    print("Could not connect to Redis.")