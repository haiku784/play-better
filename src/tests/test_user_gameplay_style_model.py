import unittest
from src.models.user_gameplay_style import UserGameplayStyleModel
from datetime import datetime

class TestUserGameplayStyleModel(unittest.TestCase):
    def test_repr(self):
        gameplay_style = UserGameplayStyleModel(id=1, user_id=123, style='Aggressive', performance_rating=95.5, created_at=datetime.now())
        self.assertEqual(repr(gameplay_style), "<UserGameplayStyle(id=1, user_id=123, style='Aggressive', performance_rating=95.5)>")

if __name__ == '__main__':
    unittest.main()