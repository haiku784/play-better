import unittest
from services.user_service import create_user, read_user, update_user, delete_user

class TestUserService(unittest.TestCase):
    def test_user_crud_operations(self):
        # Create a user
        user = create_user('test_user', 'test@example.com')
        self.assertEqual(user.username, 'test_user')

        # Read the user
        retrieved_user = read_user('test_user')
        self.assertIsNotNone(retrieved_user)
        self.assertEqual(retrieved_user.email, 'test@example.com')

        # Update the user
        updated_user = update_user('test_user', 'new_email@example.com')
        self.assertEqual(updated_user.email, 'new_email@example.com')

        # Delete the user
        result = delete_user('test_user')
        self.assertTrue(result)

if __name__ == '__main__':
    unittest.main()