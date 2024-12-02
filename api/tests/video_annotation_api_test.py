import pytest
from fastapi.testclient import TestClient
from video_annotation_api import app

client = TestClient(app)

def test_submit_annotation():
    response = client.post('/annotations/', json={'video_id': 'vid1', 'moment': 15.5, 'comment': 'Great play!'}))
    assert response.status_code == 200
    assert response.json()['comment'] == 'Great play!'


def test_get_annotations():
    client.post('/annotations/', json={'video_id': 'vid1', 'moment': 20.0, 'comment': 'Nice shot!'}))
    response = client.get('/annotations/vid1')
    assert response.status_code == 200
    assert len(response.json()) == 2