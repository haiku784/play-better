import pytest
from fastapi.testclient import TestClient
from submit_annotation import app

client = TestClient(app)

def test_submit_annotation():
    response = client.post('/annotations/', json={'moment': '00:01', 'comment': 'Great play!', 'user_id': 1})
    assert response.status_code == 200
    assert response.json()['message'] == 'Annotation submitted successfully.'


def test_get_annotations():
    response = client.get('/annotations/1')
    assert response.status_code == 200
    assert len(response.json()) > 0