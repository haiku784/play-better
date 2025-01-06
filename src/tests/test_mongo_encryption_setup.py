import unittest
import os
from mongo_encryption_setup import setup_mongo_encryption

class TestMongoEncryptionSetup(unittest.TestCase):
    def setUp(self):
        self.test_key_path = '/tmp/test_encryption_key'
        with open(self.test_key_path, 'w') as f:
            f.write('This is a test key')

    def tearDown(self):
        os.remove(self.test_key_path)

    def test_setup_encryption(self):
        setup_mongo_encryption(self.test_key_path)
        with open('/etc/mongod.conf', 'r') as config_file:
            content = config_file.read()
        self.assertIn('enableEncryption: true', content)
        self.assertIn(f'encryptionKeyFile: {self.test_key_path}', content)

if __name__ == '__main__':
    unittest.main()