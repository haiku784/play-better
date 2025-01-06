import unittest
from src.api.gameplay_data_encryption import encrypt_data_in_transit, decrypt_data_in_transit

class TestDataInTransitEncryption(unittest.TestCase):
    def setUp(self):
        # Test data for encryption and decryption
        self.plain_text = 'This is a test message for transit.'
        self.encrypted_data = encrypt_data_in_transit(self.plain_text)

    def test_in_transit_encryption(self):
        # Test that the encrypted data is not the same as plain text
        self.assertNotEqual(self.plain_text, self.encrypted_data)

    def test_in_transit_decryption(self):
        # Test that decrypting the encrypted data returns the original text
        decrypted_data = decrypt_data_in_transit(self.encrypted_data)
        self.assertEqual(self.plain_text, decrypted_data)

    def test_in_transit_decryption_invalid_data(self):
        # Test that decrypting invalid data raises an exception
        with self.assertRaises(ValueError):
            decrypt_data_in_transit('invalid_data')

if __name__ == '__main__':
    unittest.main()