import unittest
from fastapi.testclient import TestClient
from main import app

class TestGameplaySession(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_health_check(self):
        response = self.client.get('/health/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'status': 'healthy'})

if __name__ == '__main__':
    unittest.main()