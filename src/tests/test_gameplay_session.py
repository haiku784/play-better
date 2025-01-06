import unittest
from fastapi.testclient import TestClient
from src.api.app import app
from src.models.gameplay_session import GameplaySession, GameplayEvent

class TestGameplaySession(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_create_gameplay_session(self):
        session_data = GameplaySession(
            session_id='session1',
            user_id='user1',
            start_time=1622547800,
            end_time=1622547900,
            events=[],
            score=100
        )
        response = self.client.post('/sessions/gameplay_sessions/', json=session_data.dict())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['session_id'], 'session1')

    def test_get_gameplay_sessions(self):
        response = self.client.get('/sessions/gameplay_sessions/')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json(), list)

    def test_get_gameplay_session(self):
        session_data = GameplaySession(
            session_id='session2',
            user_id='user2',
            start_time=1622548000,
            end_time=1622548100,
            events=[],
            score=200
        )
        self.client.post('/sessions/gameplay_sessions/', json=session_data.dict())
        response = self.client.get('/sessions/gameplay_sessions/session2')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['session_id'], 'session2')

    def test_get_nonexistent_gameplay_session(self):
        response = self.client.get('/sessions/gameplay_sessions/nonexistent')
        self.assertEqual(response.status_code, 404)

if __name__ == '__main__':
    unittest.main()