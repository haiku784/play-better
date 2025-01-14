import pytest
from fastapi.testclient import TestClient
from api.gear_recommendation_api import router

client = TestClient(router)

def test_get_gear_recommendations_success():
    response = client.get('/get-gear-recommendations?user_id=1')
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_gear_recommendations_not_found():
    response = client.get('/get-gear-recommendations?user_id=999')
    assert response.status_code == 404
    assert response.json()['detail'] == 'No recommendations found.'

def test_get_gear_recommendations_internal_error():
    response = client.get('/get-gear-recommendations?user_id=invalid')  # Simulate an error
    assert response.status_code == 500
