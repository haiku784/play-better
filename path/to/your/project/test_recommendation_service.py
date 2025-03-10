import pytest
from fastapi.testclient import TestClient
from recommendation_service import app, HealthPlanCreate

client = TestClient(app)

@pytest.fixture
def create_health_plan():
    response = client.post("/health_plans/", json={
        "name": "Diabetes Management",
        "description": "Plan for managing diabetes",
        "recommendations": "Regular check-ups, balanced diet",
        "user_id": 1
    })
    return response.json()

def test_create_health_plan(create_health_plan):
    assert create_health_plan['name'] == "Diabetes Management"
    assert create_health_plan['description'] == "Plan for managing diabetes"

def test_read_health_plan(create_health_plan):
    plan_id = create_health_plan['plan_id']
    response = client.get(f"/health_plans/{plan_id}")
    assert response.status_code == 200
    assert response.json()['name'] == "Diabetes Management"

def test_update_health_plan(create_health_plan):
    plan_id = create_health_plan['plan_id']
    response = client.put(f"/health_plans/{plan_id}", json={
        "name": "Updated Plan",
        "description": "Updated description",
        "recommendations": "Updated recommendations",
        "user_id": 1
    })
    assert response.status_code == 200
    assert response.json()['name'] == "Updated Plan"

def test_delete_health_plan(create_health_plan):
    plan_id = create_health_plan['plan_id']
    response = client.delete(f"/health_plans/{plan_id}")
    assert response.status_code == 200
    assert response.json()['detail'] == "Health Plan deleted successfully"
    response = client.get(f"/health_plans/{plan_id}")
    assert response.status_code == 404
