import os
import base64
from cryptography.fernet import Fernet

# Function to generate a new encryption key
def generate_encryption_key():
    key = Fernet.generate_key()  # Generates a secure key
    return key

# Function to store the key in an environment variable
def store_key_in_env(key):
    os.environ['ENCRYPTION_KEY'] = key.decode()  # Store the key as a string in environment variable

# Main function to execute the key generation and storage
if __name__ == '__main__':
    encryption_key = generate_encryption_key()  # Generate the key
    print(f"Generated Encryption Key: {encryption_key.decode()}")  # Print the key for visibility
    store_key_in_env(encryption_key)  # Store the key in environment
    print("Encryption key stored in environment variable successfully.")