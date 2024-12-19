from fastapi.testclient import TestClient
from src.main import app
from src.models.data_source import DataSource

client = TestClient(app)

def test_create_data_source():
    response = client.post("/data_sources/", json={
        "source_type": "database",
        "connection_string": "db://user:pass@localhost:5432/mydb",
        "fetch_data": "fetch_function_placeholder"
    })
    assert response.status_code == 200
    assert response.json()["source_type"] == "database