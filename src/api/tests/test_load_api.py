import unittest
from load_test import load_test

class TestLoadAPI(unittest.TestCase):
    def test_load_api(self):
        responses, duration = load_test(10000, 1000)
        self.assertGreaterEqual(responses.count(200), 9500, "Less than 95% successful requests")
        self.assertLess(duration, 2000, "Load test took longer than 2000 ms")

if __name__ == '__main__':
    unittest.main()