import unittest
from fastapi.testclient import TestClient
from main import app

class TestPerformanceMetricsOverlay(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_overlay_performance_metrics(self):
        response = self.client.post("/overlay/performance-metrics", json={
            "video_stream": "video.mp4",
            "fps": 60,
            "latency": 30
        })
        assert response.status_code == 200
        assert response.json() == {"status": "success", "message": "Overlay applied successfully."}

    def test_start_overlay(self):
        response = self.client.post("/overlay/start", json={"session_id": "session1234"})
        assert response.status_code == 200
        assert response.json() == {"status": "success", "session_id": "session1234"}

    def test_stop_overlay(self):
        response = self.client.post("/overlay/stop", json={"session_id": "session1234"})
        assert response.status_code == 200
        assert response.json() == {"status": "success", "message": "Overlay session stopped successfully."}

if __name__ == '__main__':
    unittest.main()