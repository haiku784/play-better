import time
from collections import defaultdict

class CachingManager:
    def __init__(self, expiration_time=300):
        """
        Initialize the Caching Manager.
        :param expiration_time: Time in seconds before the cache expires.
        """
        self.cache = defaultdict(lambda: (None, 0))  # key: (value, timestamp)
        self.expiration_time = expiration_time

    def set(self, key, value):
        """
        Set a value in the cache with the current timestamp.
        :param key: The key for the cached value.
        :param value: The value to cache.
        """
        self.cache[key] = (value, time.time())

    def get(self, key):
        """
        Retrieve a value from the cache if it hasn't expired.
        :param key: The key for the cached value.
        :return: The cached value or None if not found or expired.
        """
        value, timestamp = self.cache[key]
        if time.time() - timestamp < self.expiration_time:
            return value
        else:
            # Remove expired cache
            self.cache.pop(key, None)
            return None

    def clear(self):
        """
        Clear all cached values.
        """
        self.cache.clear()

# Example usage:
if __name__ == '__main__':
    cache = CachingManager(expiration_time=60)  # 60 seconds expiration
    cache.set('example_key', 'example_value')
    print(cache.get('example_key'))  # Should print 'example_value'
    time.sleep(61)  # Wait for expiration
    print(cache.get('example_key'))  # Should print None
