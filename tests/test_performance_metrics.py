import unittest
from fastapi.testclient import TestClient
from services.gameplay_recording.performance_metrics_service import app

class PerformanceMetricsTest(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_performance_metrics_valid_request(self):
        response = self.client.post('/metrics/player', json={
            "playerId": "player1",
            "matchData": [{"score": 10, "assists": 2}]
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('performanceMetrics', response.json())

    def test_performance_metrics_missing_data(self):
        response = self.client.post('/metrics/player', json={"playerId": "player1"})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['detail'], "Match data is required.")

if __name__ == '__main__':
    unittest.main()