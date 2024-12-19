from pymongo import MongoClient
import ssl

class MongoDBConnector:
    def __init__(self, uri, ssl_certfile):
        self.uri = uri
        self.ssl_certfile = ssl_certfile
        self.client = self.connect()

    def connect(self):
        # Create a MongoDB client with SSL enabled
        try:
            client = MongoClient(
                self.uri,
                ssl=True,
                ssl_certfile=self.ssl_certfile,
                ssl_cert_reqs=ssl.CERT_REQUIRED
            )
            return client
        except Exception as e:
            print(f"Failed to connect to MongoDB: {e}")
            raise

    def get_database(self, db_name):
        # Retrieve a database from the MongoDB client
        return self.client[db_name]

# Example usage:
# connector = MongoDBConnector('mongodb://your-mongodb-uri', '/path/to/certfile.pem')