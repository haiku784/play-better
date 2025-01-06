import unittest
from app import app

class FeedbackCollectionAPITest(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()  # Create a test client for the app
        self.app.testing = True

    def test_submit_feedback(self):
        response = self.app.post('/api/feedback', json={
            'userName': 'Jane Doe',
            'feedback': 'Very informative!'
        })
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json['message'], 'Feedback received')

if __name__ == '__main__':
    unittest.main()