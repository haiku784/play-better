import redis

class SessionCacheManager:
    def __init__(self, host='localhost', port=6379, db=0):
        # Initialize Redis cache connection
        self.cache = redis.StrictRedis(host=host, port=port, db=db, decode_responses=True)

    def set_session(self, session_id, session_data):
        # Store session data in the cache with an expiration time
        self.cache.setex(session_id, 3600, session_data)  # 1 hour expiration

    def get_session(self, session_id):
        # Retrieve session data from the cache
        return self.cache.get(session_id)

    def delete_session(self, session_id):
        # Delete a session from the cache
        self.cache.delete(session_id)
