import pytest
from fastapi.testclient import TestClient
from analytics_service import app, HealthData
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Test database configuration
TEST_DATABASE_URL = "postgresql://user:password@localhost/test_dbname"

# SQLAlchemy setup for testing
engine = create_engine(TEST_DATABASE_URL)
Base = declarative_base()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create the test database tables
Base.metadata.create_all(bind=engine)

client = TestClient(app)

@pytest.fixture(scope="module")
def test_db():
    db = SessionLocal()
    yield db
    db.close()

def test_create_health_data(test_db):
    response = client.post("/healthdata/", json={"value": 75.0, "unit": "kg"})
    assert response.status_code == 200
    assert "id" in response.json()

def test_get_health_data(test_db):
    response = client.post("/healthdata/", json={"value": 75.0, "unit": "kg"})
    health_data_id = response.json()["id"]
    response = client.get(f"/healthdata/{health_data_id}/")
    assert response.status_code == 200
    assert response.json()["value"] == 75.0

def test_get_all_health_data(test_db):
    response = client.get("/healthdata/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)