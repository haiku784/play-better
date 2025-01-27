import unittest
from fastapi.testclient import TestClient
from main import app

class TestRecommendationService(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_get_recommendations(self):
        response = self.client.post('/recommendations', json={"user_id": "user123"})
        self.assertEqual(response.status_code, 200)
        self.assertIn('recommendations', response.json())

    def test_get_user_profile(self):
        response = self.client.get('/user-profile?user_id=user123')
        self.assertEqual(response.status_code, 200)
        self.assertIn('user_id', response.json())

if __name__ == '__main__':
    unittest.main()