import unittest
from fastapi.testclient import TestClient
from recommendation_engine import app

class TestRecommendationEngine(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_generate_recommendations_success(self):
        response = self.client.post("/api/recommendations", json={
            "user_id": "user1",
            "preferences": {
                "game_types": ["FPS"],
                "brands": ["BrandX"],
                "price_range": [50, 200]
            },
            "feedback_score": 4.5
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('recommendations', response.json())

    def test_generate_recommendations_missing_user_id(self):
        response = self.client.post("/api/recommendations", json={
            "preferences": {
                "game_types": ["FPS"],
                "brands": ["BrandX"],
                "price_range": [50, 200]
            }
        })
        self.assertEqual(response.status_code, 400)
        self.assertIn("User ID and preferences are required", response.json()['detail'])

if __name__ == '__main__':
    unittest.main()