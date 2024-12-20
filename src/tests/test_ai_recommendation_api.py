import unittest
from app import app

class TestAIRecommendationAPI(unittest.TestCase):
    """
    Unit tests for the AI Recommendation API.
    """

    @classmethod
    def setUpClass(cls):
        # Set up a test client for the Flask application
        cls.app = app.test_client()
        cls.app.testing = True

    def test_get_recommendations_success(self):
        response = self.app.post('/api/recommendations', json={'gameplay_data': {'score': 85, 'level': 3}})
        self.assertEqual(response.status_code, 200)
        self.assertIn('recommendations', response.json)

    def test_get_recommendations_no_data(self):
        response = self.app.post('/api/recommendations', json={})
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json)

    def test_get_recommendations_missing_gameplay_data(self):
        response = self.app.post('/api/recommendations', json={'gameplay_data': None})
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json)

if __name__ == '__main__':
    unittest.main()