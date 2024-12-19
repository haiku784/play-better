import unittest
from src.models.gameplay_session_model import GameplaySession

class TestGameplaySessionModel(unittest.TestCase):
    """
    Unit tests for the GameplaySession model.
    """
    def setUp(self):
        # Setup code to initiate the database connection
        pass

    def tearDown(self):
        # Code to cleanup after each test
        pass

    def test_create_gameplay_session(self):
        """
        Test the creation of a gameplay session.
        """
        session = GameplaySession(
            user_id='user123',
            session_id='session456',
            session_data={"score": 100, "level": 3},
            metadata={
                "gameTitle": "Adventure Quest",
                "platform": "PC",
                "duration": 3600
            }
        )
        self.assertIsNotNone(session)
        self.assertEqual(session.user_id, 'user123')

if __name__ == '__main__':
    unittest.main()