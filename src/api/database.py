from pymongo import MongoClient
from encryption_utility import EncryptionUtility

class Database:
    """Class to handle MongoDB connections with encryption enabled."""

    def __init__(self, uri: str):
        self.client = MongoClient(uri)
        self.db = self.client['user_data']
        self.encryption_utility = EncryptionUtility()

    def store_user_data(self, user_data: dict):
        """Encrypts and stores user data in the database."""
        encrypted_data = self.encryption_utility.encrypt(str(user_data).encode())
        self.db.users.insert_one({'data': encrypted_data})

    def retrieve_user_data(self, user_id):
        """Retrieves and decrypts user data from the database by user ID."""
        encrypted_data = self.db.users.find_one({'_id': user_id})['data']
        return self.encryption_utility.decrypt(encrypted_data)

