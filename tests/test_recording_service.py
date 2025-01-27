import unittest
from fastapi.testclient import TestClient
from services.gameplay_recording.main import app

class TestMatchDataCollectionService(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_collect_match_data_success(self):
        response = self.client.post('/match-data/collect', json={
            "matchId": "12345",
            "playerStats": [{"score": 2, "assists": 1}],
            "gameEvents": [{"event_type": "goal", "player_id": "player1", "timestamp": "00:20:00"}]
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'success')

    def test_collect_match_data_failure(self):
        response = self.client.post('/match-data/collect', json={})  # Missing required fields
        self.assertEqual(response.status_code, 422)  # Unprocessable Entity

    def test_get_match_report_success(self):
        response = self.client.get('/match-data/report?matchId=12345')
        self.assertEqual(response.status_code, 200)
        self.assertIn('report', response.json())

    def test_get_match_report_failure(self):
        response = self.client.get('/match-data/report?matchId=nonexistent')  # Non-existing match ID
        self.assertEqual(response.status_code, 404)

if __name__ == '__main__':
    unittest.main()