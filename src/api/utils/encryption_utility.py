import os
from cryptography.fernet import Fernet

class EncryptionUtility:
    """Utility class for handling encryption and decryption."""

    def __init__(self):
        # Generate a key if it does not exist
        if not os.path.exists('secret.key'):
            self.key = Fernet.generate_key()
            with open('secret.key', 'wb') as key_file:
                key_file.write(self.key)
        else:
            with open('secret.key', 'rb') as key_file:
                self.key = key_file.read()

        self.cipher_suite = Fernet(self.key)

    def encrypt(self, data: bytes) -> bytes:
        """Encrypts the provided data."""
        return self.cipher_suite.encrypt(data)

    def decrypt(self, encrypted_data: bytes) -> bytes:
        """Decrypts the provided encrypted data."""
        return self.cipher_suite.decrypt(encrypted_data)

