from cryptography.fernet import Fernet

# Generate a key for encryption and decryption
key = Fernet.generate_key()
fernet = Fernet(key)

def encrypt_data(data: str) -> str:
    """Encrypts the given data using Fernet encryption."""
    # Convert the data to bytes before encryption
    data_bytes = data.encode()
    encrypted_data = fernet.encrypt(data_bytes)
    return encrypted_data.decode()  # Return encrypted data as string


def decrypt_data(encrypted_data: str) -> str:
    """Decrypts the given encrypted data using Fernet encryption."""
    encrypted_data_bytes = encrypted_data.encode()
    decrypted_data = fernet.decrypt(encrypted_data_bytes)
    return decrypted_data.decode()  # Return decrypted data as string

