import unittest
from load_tester import load_test_request

class TestLoadTester(unittest.TestCase):
    def test_load_test_request_success(self):
        url = 'http://localhost:8000/api/endpoint'  # Test URL
        status_code, elapsed_time = load_test_request(url)
        # Check if the response is 200 OK
        self.assertEqual(status_code, 200, f'Expected 200 OK, got {status_code}')
        # Check if the response time is under 2 seconds
        self.assertLess(elapsed_time, 2, f'Response time exceeded 2 seconds: {elapsed_time}')

if __name__ == '__main__':
    unittest.main()