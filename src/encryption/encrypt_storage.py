import os
from cryptography.fernet import Fernet

# Function to generate a key for encryption
def generate_key():
    key = Fernet.generate_key()
    with open('secret.key', 'wb') as key_file:
        key_file.write(key)
    return key

# Function to load the previously generated key
def load_key():
    return open('secret.key', 'rb').read()

# Function for encryption of the message
def encrypt_message(message):
    key = load_key()
    f = Fernet(key)  
    encrypted_message = f.encrypt(message.encode())
    return encrypted_message

# Function for decryption of the message
def decrypt_message(encrypted_message):
    key = load_key()
    f = Fernet(key)
    decrypted_message = f.decrypt(encrypted_message).decode()
    return decrypted_message

# Sample usage
if __name__ == '__main__':
    # Generate a key only once
    if not os.path.exists('secret.key'):
        generate_key()
    
    original_message = 'This is a secret message.'
    encrypted = encrypt_message(original_message)
    print(f'Encrypted: {encrypted}')
    decrypted = decrypt_message(encrypted)
    print(f'Decrypted: {decrypted}')