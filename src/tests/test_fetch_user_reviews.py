import unittest
from fastapi.testclient import TestClient
from src.api.main import app

class TestFetchUserReviews(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_fetch_reviews_valid(self):
        response = self.client.get("/user-reviews/?user_id=123&gear_option_ids=456,789")
        assert response.status_code == 200

    def test_fetch_reviews_no_user_id(self):
        response = self.client.get("/user-reviews/?gear_option_ids=456,789")
        assert response.status_code == 400
        assert response.json() == {"detail": "user_id is required"}

    def test_fetch_reviews_no_reviews_found(self):
        response = self.client.get("/user-reviews/?user_id=999&gear_option_ids=456,789")
        assert response.status_code == 404
        assert response.json() == {"message": "No reviews found for this user and gear options."}

if __name__ == '__main__':
    unittest.main()