import unittest
from fastapi.testclient import TestClient
from analysis_service import app, PerformanceMetric
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import IntegrityError

DATABASE_URL = "postgresql://user:password@localhost/test_db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class TestAnalysisService(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)
        cls.db = SessionLocal()

    @classmethod
    def tearDownClass(cls):
        cls.db.close()

    def test_create_performance_metric(self):
        response = self.client.post("/performance_metrics/", json={
            "session_id": 1,
            "kills": 10,
            "deaths": 2,
            "assists": 5,
            "accuracy": 75
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("metric_id", response.json())

    def test_read_performance_metric(self):
        response = self.client.get("/performance_metrics/1")
        self.assertEqual(response.status_code, 200)
        self.assertIn("kills", response.json())

    def test_read_performance_metrics(self):
        response = self.client.get("/performance_metrics/")
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json(), list)

    def test_delete_performance_metric(self):
        response = self.client.delete("/performance_metrics/1")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"detail": "PerformanceMetric deleted successfully"})

if __name__ == '__main__':
    unittest.main()