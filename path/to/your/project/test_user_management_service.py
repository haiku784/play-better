import pytest
from fastapi.testclient import TestClient
from user_management_service import app, User
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Setup for testing
DATABASE_URL = "postgresql://user:password@localhost/test_db"
engine = create_engine(DATABASE_URL)
Base = declarative_base()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a test client
client = TestClient(app)

@pytest.fixture
def db():
    connection = engine.connect()
    transaction = connection.begin()
    yield SessionLocal()
    transaction.rollback()
    connection.close()

def test_create_user(db):
    response = client.post("/users/", json={"username": "testuser", "email": "test@example.com", "password": "testpass"})
    assert response.status_code == 200
    assert response.json()["username"] == "testuser"

def test_read_user(db):
    client.post("/users/", json={"username": "testuser", "email": "test@example.com", "password": "testpass"})
    response = client.get("/users/1")
    assert response.status_code == 200
    assert response.json()["username"] == "testuser"

def test_update_user(db):
    client.post("/users/", json={"username": "testuser", "email": "test@example.com", "password": "testpass"})
    response = client.put("/users/1", json={"username": "updateduser", "email": "updated@example.com", "password": "newpass"})
    assert response.status_code == 200
    assert response.json()["username"] == "updateduser"

def test_delete_user(db):
    client.post("/users/", json={"username": "testuser", "email": "test@example.com", "password": "testpass"})
    response = client.delete("/users/1")
    assert response.status_code == 200
    assert response.json()["detail"] == "User deleted