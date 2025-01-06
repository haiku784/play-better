import cryptography
from cryptography.fernet import Fernet

class DataInTransitEncryption:
    """
    A class to handle data encryption for gameplay data in transit using Fernet symmetric encryption.
    """
    def __init__(self):
        # Generate a key for encryption
        self.key = Fernet.generate_key()
        self.cipher = Fernet(self.key)

    def encrypt_data(self, data: str) -> str:
        """
        Encrypts the provided data.
        :param data: The data to encrypt.
        :return: Encrypted data as a string.
        """
        return self.cipher.encrypt(data.encode()).decode()

    def decrypt_data(self, encrypted_data: str) -> str:
        """
        Decrypts the provided encrypted data.
        :param encrypted_data: The encrypted data to decrypt.
        :return: Decrypted data as a string.
        """
        return self.cipher.decrypt(encrypted_data.encode()).decode()  

# Example of usage
# encryption = DataInTransitEncryption()
# encrypted = encryption.encrypt_data('Hello, World!')
# print(encrypted)
# decrypted = encryption.decrypt_data(encrypted)
# print(decrypted)