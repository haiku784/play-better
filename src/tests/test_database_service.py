import unittest
from .database_service import DatabaseService

class TestDatabaseService(unittest.TestCase):
    """ Unit tests for DatabaseService. """

    def setUp(self):
        self.service = DatabaseService()  # Initialize the database service

    def test_fetch_data_with_cache(self):
        """ Test fetching data that should use the cache. """
        result1 = self.service.fetch_data('SELECT * FROM users')
        result2 = self.service.fetch_data('SELECT * FROM users')  # Should hit the cache
        self.assertEqual(result1, result2)  # Both results should be the same

    def test_fetch_data_different_query(self):
        """ Test fetching different queries. """
        result1 = self.service.fetch_data('SELECT * FROM users')
        result2 = self.service.fetch_data('SELECT * FROM orders')
        self.assertNotEqual(result1, result2)  # Should not be the same due to different queries

if __name__ == '__main__':
    unittest.main()