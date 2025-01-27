import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_highlight_events_success():
    response = client.post('/highlight-events', json={
        "match_id": "12345",
        "event_types": ["goal", "foul"],
        "time_range": {"start_time": "00:00:00", "end_time": "01:00:00"}
    })
    assert response.status_code == 200
    assert "highlights" in response.json()


def test_highlight_events_failure():
    response = client.post('/highlight-events', json={
        "event_types": ["goal", "foul"]
    })
    assert response.status_code == 400
    assert response.json()['detail'] == 'Match ID and event types are required.'
