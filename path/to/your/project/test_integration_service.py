import pytest
from fastapi.testclient import TestClient
from integration_service import app, ExternalSystemIntegration
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Database configuration for testing
DATABASE_URL = "postgresql://user:password@localhost/test_db"

# SQLAlchemy setup for testing
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
Base.metadata.create_all(bind=engine)

client = TestClient(app)

@pytest.fixture(scope="module")
def test_db():
    db = SessionLocal()
    yield db
    db.close()

def test_create_integration(test_db):
    response = client.post("/integrations/", json={"name": "Test Integration", "api_url": "http://api.test.com", "api_key": "test_key"})
    assert response.status_code == 200
    assert response.json()["name"] == "Test Integration"

def test_read_integration(test_db):
    response = client.get("/integrations/1")
    assert response.status_code == 200
    assert response.json()["name"] == "Test Integration"

def test_update_integration(test_db):
    response = client.put("/integrations/1", json={"name": "Updated Integration", "api_url": "http://api.updated.com", "api_key": "updated_key"})
    assert response.status_code == 200
    assert response.json()["name"] == "Updated Integration"

def test_delete_integration(test_db):
    response = client.delete("/integrations/1")
    assert response.status_code == 200
    assert response.json()["detail"] == "Integration deleted successfully