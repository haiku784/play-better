from fastapi.testclient import TestClient
from main import app
from models.user_gameplay_style import UserGameplayStats

client = TestClient(app)

# Test cases for gear recommendation API

def test_recommend_gear_aggressive():
    response = client.post("/recommendations/", json={
        "user_id": 1,
        "gameplay_style": "aggressive",
        "statistics": {}
    })
    assert response.status_code == 200
    assert len(response.json()) > 0
    assert response.json()[0]['gear_name'] == "Assault Rifle"


def test_recommend_gear_defensive():
    response = client.post("/recommendations/", json={
        "user_id": 1,
        "gameplay_style": "defensive",
        "statistics": {}
    })
    assert response.status_code == 200
    assert len(response.json()) > 0
    assert response.json()[0]['gear_name'] == "Sniper Rifle"


def test_recommend_gear_invalid_style():
    response = client.post("/recommendations/", json={
        "user_id": 1,
        "gameplay_style": "stealth",
        "statistics": {}
    })
    assert response.status_code == 404
    assert response.json()['detail'] == "Gameplay style not found"  
