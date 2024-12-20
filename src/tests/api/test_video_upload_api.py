import unittest
from fastapi.testclient import TestClient
from src.api.video_upload_api import app

class TestVideoUploadAPI(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_upload_video(self):
        """Test uploading video file to the API."""
        with open('test_video.mp4', 'rb') as video_file:
            response = self.client.post('/upload/', files={'file': video_file})
            self.assertEqual(response.status_code, 200)
            self.assertIn('message', response.json())

    def test_retrieve_video(self):
        """Test retrieving video data for a specific user."""
        response = self.client.get('/videos/1')  # Assuming user ID is 1
        self.assertEqual(response.status_code, 200)
        self.assertIn('user_video_data', response.json())

if __name__ == '__main__':
    unittest.main()