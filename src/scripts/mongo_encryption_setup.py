import os

def setup_mongo_encryption(encryption_key_path):
    """
    Setup MongoDB to enable encryption at rest.
    :param encryption_key_path: Path to the encryption key file
    """
    if not os.path.exists(encryption_key_path):
        raise FileNotFoundError(f"Encryption key file not found: {encryption_key_path}")
    
    with open('/etc/mongod.conf', 'a') as config_file:
        config_file.write(f'
security:')
        config_file.write(f'
  enableEncryption: true')
        config_file.write(f'
  encryptionKeyFile: {encryption_key_path}')
    
    print("MongoDB configuration updated to enable encryption at rest.")

# Example call to the function
setup_mongo_encryption('/path/to/your/encryption-keyfile')