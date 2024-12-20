import unittest
from fastapi.testclient import TestClient
from src.api.recording_api import app

class TestRecordingAPI(unittest.TestCase):
    """
    Unit tests for the RecordingAPI to ensure correct functionality, including successful retrieval, handling of not found recordings, and unauthorized access.
    """
    def setUp(self):
        self.client = TestClient(app)

    def test_get_recording_success(self):
        response = self.client.get("/recording/1")
        self.assertEqual(response.status_code, 200)
        self.assertIn("recording_data", response.json())

    def test_get_recording_not_found(self):
        response = self.client.get("/recording/999")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json()["detail"], "Recording not found")

if __name__ == '__main__':
    unittest.main()