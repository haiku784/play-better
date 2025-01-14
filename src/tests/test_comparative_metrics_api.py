import pytest
from fastapi.testclient import TestClient
from api.comparative_metrics_api import app

client = TestClient(app)

def test_save_comparative_metrics():
    response = client.post('/comparative-metrics', json={
        'user_id': 'test_user',
        'configuration_id': 'config_1',
        'metric_type': 'kill/death ratio',
        'value': 2.5
    })
    assert response.status_code == 200
    assert 'id' in response.json()

@pytest.mark.parametrize('invalid_data', [
    {'user_id': '', 'configuration_id': 'config_1', 'metric_type': 'kill/death ratio', 'value': 2.5},
    {'user_id': 'test_user', 'configuration_id': 'config_1', 'metric_type': 'kill/death ratio'}, # missing 'value'
])
def test_save_comparative_metrics_invalid(invalid_data):
    response = client.post('/comparative-metrics', json=invalid_data)
    assert response.status_code == 422
