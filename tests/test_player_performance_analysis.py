import unittest
from fastapi.testclient import TestClient
from api.player_performance_analysis import app

class TestPlayerPerformanceAnalysis(unittest.TestCase):
    """Unit tests for the player performance analysis API endpoint."""

    def setUp(self):
        self.client = TestClient(app)

    def test_analyze_player_performance_success(self):
        response = self.client.post('/api/analysis/player-performance', json={
            'playerId': 'player123',
            'matchData': [
                {'goals': 2, 'assists': 1, 'total_passes': 10, 'successful_passes': 8},
                {'goals': 1, 'assists': 0, 'total_passes': 5, 'successful_passes': 4}
            ]
        })
        assert response.status_code == 200
        assert 'performanceMetrics' in response.json()
        assert 'reportUrl' in response.json()  

    def test_analyze_player_performance_missing_fields(self):
        response = self.client.post('/api/analysis/player-performance', json={})
        assert response.status_code == 400

if __name__ == '__main__':
    unittest.main()