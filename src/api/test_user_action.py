from fastapi.testclient import TestClient
from user_action import app

test_client = TestClient(app)

def test_log_user_action():
    response = test_client.post('/user-action', json={'action': 'jump', 'timestamp': '2023-01-01T00:00:00Z'})
    assert response.status_code == 200
    assert response.json() == {'message': 'User action logged', 'action': 'jump'}