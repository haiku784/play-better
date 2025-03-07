import unittest
from fastapi.testclient import TestClient
from recommendation_service import app

class TestRecommendationService(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_create_recommendation(self):
        response = self.client.post("/recommendations/", json={
            "user_id": 1,
            "hardware_recommendations": "NVIDIA RTX 3080",
            "config_recommendations": "High settings"
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("hardware_recommendations", response.json())

    def test_get_recommendations(self):
        response = self.client.get("/recommendations/1/")
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json(), list)

if __name__ == '__main__':
    unittest.main()