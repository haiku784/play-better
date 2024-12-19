import unittest
from caching_manager import CachingManager
import time

class TestCachingManager(unittest.TestCase):
    def setUp(self):
        self.cache = CachingManager(expiration_time=5)  # 5 seconds expiration

    def test_set_and_get(self):
        self.cache.set('test_key', 'test_value')
        self.assertEqual(self.cache.get('test_key'), 'test_value')

    def test_cache_expiration(self):
        self.cache.set('test_key', 'test_value')
        time.sleep(6)  # Wait for expiration
        self.assertIsNone(self.cache.get('test_key'))

    def test_clear(self):
        self.cache.set('test_key', 'test_value')
        self.cache.clear()
        self.assertIsNone(self.cache.get('test_key'))

if __name__ == '__main__':
    unittest.main()