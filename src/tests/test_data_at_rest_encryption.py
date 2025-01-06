import unittest
from src.api.gameplay_data_encryption import encrypt_data, decrypt_data

class TestDataAtRestEncryption(unittest.TestCase):
    def setUp(self):
        # Test data for encryption and decryption
        self.plain_text = 'This is a test message.'
        self.encrypted_data = encrypt_data(self.plain_text)

    def test_encryption(self):
        # Test that the encrypted data is not the same as plain text
        self.assertNotEqual(self.plain_text, self.encrypted_data)

    def test_decryption(self):
        # Test that decrypting the encrypted data returns the original text
        decrypted_data = decrypt_data(self.encrypted_data)
        self.assertEqual(self.plain_text, decrypted_data)

    def test_decryption_invalid_data(self):
        # Test that decrypting invalid data raises an exception
        with self.assertRaises(ValueError):
            decrypt_data('invalid_data')

if __name__ == '__main__':
    unittest.main()