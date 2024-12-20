import unittest
from encryption_module import encrypt_data, decrypt_data

class TestEncryptionModule(unittest.TestCase):
    def test_encryption_decryption(self):
        original_data = "Sensitive Information"
        encrypted = encrypt_data(original_data)
        decrypted = decrypt_data(encrypted)
        
        # Check that the decrypted data matches the original data
        self.assertEqual(original_data, decrypted)

    def test_decrypt_invalid_data(self):
        with self.assertRaises(Exception):
            decrypt_data("invalid_encrypted_data")

if __name__ == '__main__':
    unittest.main()