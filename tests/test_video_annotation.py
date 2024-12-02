import pytest
from fastapi.testclient import TestClient
from video_annotation import app

client = TestClient(app)

def test_submit_annotation():
    response = client.post('/annotations/', json={'moment': '00:01:23', 'comment': 'Great move!'})
    assert response.status_code == 200
    assert response.json() == {'moment': '00:01:23', 'comment': 'Great move!'}


def test_get_annotations():
    response = client.get('/annotations/')
    assert response.status_code == 200
    assert isinstance(response.json(), list)