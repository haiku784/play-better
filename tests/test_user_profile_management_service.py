from fastapi.testclient import TestClient
from services.user_profile_management.user_profile_management_service import app

client = TestClient(app)

def test_create_user_profile():
    response = client.post('/api/user/profile', json={
        'userId': '123',
        'preferredGames': ['Game1', 'Game2'],
        'gamingStyles': ['Style1', 'Style2'],
    })
    assert response.status_code == 200
    assert response.json()['status'] == 'success'


def test_get_user_profile():
    # First create a profile
    client.post('/api/user/profile', json={
        'userId': '123',
        'preferredGames': ['Game1', 'Game2'],
        'gamingStyles': ['Style1', 'Style2'],
    })
    # Then retrieve it
    response = client.get('/api/user/profile/123')
    assert response.status_code == 200
    assert response.json()['status'] == 'success'


def test_get_recommendations():
    # First create a profile
    client.post('/api/user/profile', json={
        'userId': '123',
        'preferredGames': ['Game1', 'Game2'],
        'gamingStyles': ['Style1', 'Style2'],
    })
    # Then get recommendations
    response = client.get('/api/user/profile/recommendations?userId=123')
    assert response.status_code == 200
    assert response.json()['status'] == 'success'