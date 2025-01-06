import pymongo
import base64
from cryptography.fernet import Fernet

class DataAtRestEncryption:
    """
    A class to handle data encryption for gameplay data at rest.
    """
    def __init__(self, db_uri, db_name):
        # MongoDB connection
        self.client = pymongo.MongoClient(db_uri)
        self.db = self.client[db_name]
        self.key = Fernet.generate_key()  # Key for encrypting data
        self.cipher = Fernet(self.key)

    def store_data(self, collection_name, data):
        """
        Encrypts the data and stores it in the database.
        :param collection_name: MongoDB collection name to store data.
        :param data: The data to encrypt and store.
        """
        encrypted_data = self.cipher.encrypt(data.encode())
        self.db[collection_name].insert_one({'data': encrypted_data})

    def retrieve_data(self, collection_name):
        """
        Retrieves and decrypts the data from the database.
        :param collection_name: MongoDB collection name to retrieve data from.
        :return: Decrypted data.
        """
        stored_data = self.db[collection_name].find()  
        decrypted_data = []
        for record in stored_data:
            decrypted_data.append(self.cipher.decrypt(record['data']).decode())
        return decrypted_data

# Example of usage
# db_handler = DataAtRestEncryption('mongodb://localhost:27017/', 'gameplay_db')
# db_handler.store_data('sessions', 'Gameplay Session 1')
# print(db_handler.retrieve_data('sessions'))