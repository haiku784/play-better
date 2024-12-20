import pytest
from fastapi.testclient import TestClient
from src.api.caching_middleware import app

client = TestClient(app)

@pytest.mark.parametrize('endpoint', ['/data'])
def test_cache_response(endpoint):
    """Test to ensure cached responses are returned correctly."""
    response1 = client.get(endpoint)
    assert response1.status_code == 200
    response2 = client.get(endpoint)
    assert response2.status_code == 200
    assert response1.json() == response2.json()  # Response should be cached
