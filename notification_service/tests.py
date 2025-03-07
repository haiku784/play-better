from django.test import TestCase
from .models import Notification

class NotificationModelTest(TestCase):
    def setUp(self):
        Notification.objects.create(user_id=1, message='Test notification')

    def test_notification_creation(self):
        notification = Notification.objects.get(user_id=1)
        self.assertEqual(notification.message, 'Test notification')
        self.assertFalse(notification.is_read)

    def test_notification_str(self):
        notification = Notification.objects.get(user_id=1)
        self.assertEqual(str(notification), 'Notification for user 1 - Test notification')
