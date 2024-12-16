import os
from cryptography.fernet import Fernet

# Generate a key for encryption and decryption
# This key should be stored securely
def generate_key():
    return Fernet.generate_key()

# Encrypt data using the provided key
def encrypt_data(data, key):
    fernet = Fernet(key)
    encrypted_data = fernet.encrypt(data.encode())
    return encrypted_data

# Decrypt data using the provided key
def decrypt_data(encrypted_data, key):
    fernet = Fernet(key)
    decrypted_data = fernet.decrypt(encrypted_data).decode()
    return decrypted_data

# Example usage
if __name__ == '__main__':
    # Generate a key
    key = generate_key()
    print(f"Generated Key: {key.decode()}")

    # Original data
    user_data = 'Sensitive user information'

    # Encrypt the data
    encrypted = encrypt_data(user_data, key)
    print(f"Encrypted Data: {encrypted.decode()}")

    # Decrypt the data
    decrypted = decrypt_data(encrypted, key)
    print(f"Decrypted Data: {decrypted}")