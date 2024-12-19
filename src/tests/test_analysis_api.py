from fastapi.testclient import TestClient
from src.api.analysis_api import app

client = TestClient(app)

def test_analyze_recording():
    response = client.post("/recordings/", json={"id": 1, "data": "test data"})
    assert response.status_code == 200
    analysis_response = client.post("/analyze/1")
    assert analysis_response.status_code == 200
    assert "analysis" in analysis_response.json()
