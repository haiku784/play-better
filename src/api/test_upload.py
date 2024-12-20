import pytest
from fastapi.testclient import TestClient
from src.api.upload import app

client = TestClient(app)

def test_upload_file():
    with open("test_file.txt", "w") as f:
        f.write("This is a test file.")
    with open("test_file.txt", "rb") as f:
        response = client.post("/upload", files={"upload_file": f})
        assert response.status_code == 200
        assert response.json() == {"filename": "test_file.txt"}
