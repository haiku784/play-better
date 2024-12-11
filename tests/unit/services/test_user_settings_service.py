import unittest
from app.services.user_settings import UserSettingsService
from app.models import UserSettings

class TestUserSettingsService(unittest.TestCase):
    def setUp(self):
        """Set up a UserSettingsService instance for testing"""
        self.service = UserSettingsService()
        self.test_settings = UserSettings(
            user_id=1,
            notifications_enabled=True,
            dark_mode=False,
            language='English'
        )

    def test_validate_settings_valid(self):
        """Test the settings validation with valid data"""
        result = self.service.validate_settings(self.test_settings)
        self.assertTrue(result)

    def test_validate_settings_invalid_language(self):
        """Test validation failure for an invalid language"""
        self.test_settings.language = 'InvalidLanguage'
        with self.assertRaises(ValueError):
            self.service.validate_settings(self.test_settings)

    def test_optimize_settings(self):
        """Test optimizing settings"""
        result = self.service.optimize_settings(self.test_settings)
        self.assertEqual(result['dark_mode'], True)
        self.assertEqual(result['notifications_enabled'], True)

if __name__ == '__main__':
    unittest.main()