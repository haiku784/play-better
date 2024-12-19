from .caching_manager import CachingManager

class DatabaseService:
    """ A service class for handling database operations. """

    def __init__(self):
        self.cache_manager = CachingManager()  # Initialize the caching manager

    def fetch_data(self, query):
        """ Fetches data with caching enabled. """
        return self.cache_manager.get_data(query)  # This will use the cached version if available
