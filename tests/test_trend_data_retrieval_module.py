import pytest
from fastapi.testclient import TestClient
from services.visual_data_representation.main import app

test_client = TestClient(app)


def test_get_trend_data():
    response = test_client.get('/api/visualization/trends?category=scoring')
    assert response.status_code == 200
    assert 'trends' in response.json()


def test_get_trend_data_missing_category():
    response = test_client.get('/api/visualization/trends')
    assert response.status_code == 400