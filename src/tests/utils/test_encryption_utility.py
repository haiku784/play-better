import unittest
from src.api.utils.encryption_utility import EncryptionUtility

class TestEncryptionUtility(unittest.TestCase):
    def setUp(self):
        self.crypt_util = EncryptionUtility()

    def test_encryption_decryption(self):
        """Test that encryption and decryption works correctly."""
        original_data = b"Sensitive user data"
        encrypted_data = self.crypt_util.encrypt(original_data)
        decrypted_data = self.crypt_util.decrypt(encrypted_data)
        self.assertEqual(original_data, decrypted_data)

if __name__ == '__main__':
    unittest.main()