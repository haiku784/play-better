import unittest
from fastapi.testclient import TestClient
from notification_service import app

class TestNotificationService(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_create_reminder(self):
        response = self.client.post("/reminders/", json={
            "user_id": 1,
            "type": "Medication",
            "date_time": "2023-10-10T10:00:00",
            "frequency": "Daily"
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("reminder_id", response.json())

    def test_read_reminder(self):
        response = self.client.get("/reminders/1")
        self.assertEqual(response.status_code, 200)
        self.assertIn("type", response.json())

    def test_delete_reminder(self):
        response = self.client.delete("/reminders/1")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"detail": "Reminder deleted successfully"})

if __name__ == '__main__':
    unittest.main()