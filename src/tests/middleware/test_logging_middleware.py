import pytest
from fastapi.testclient import TestClient
from ..logging_middleware import LoggingMiddleware
from fastapi import FastAPI

app = FastAPI()
app.add_middleware(LoggingMiddleware)

@app.get("/test")
async def test_endpoint():
    return {"message": "This is a test"}

client = TestClient(app)

def test_logging_middleware():
    response = client.get("/test")
    assert response.status_code == 200
    assert response.json() == {"message": "This is a test"}
