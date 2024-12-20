import unittest
from locust import HttpUser, task
from load_tester import LoadTester

class TestLoadTester(unittest.TestCase):
    def test_load_test_api(self):
        tester = LoadTester()
        with tester.client.get('/api/video_upload', catch_response=True) as response:
            self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()