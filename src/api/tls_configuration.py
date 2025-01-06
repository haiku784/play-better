import ssl

# Function to create a TLS context for secure communication

def create_tls_context():
    # Create a default SSL context
    context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
    # Load the server's certificate and private key
    context.load_cert_chain(certfile='path/to/server.crt', keyfile='path/to/server.key')
    # Ensure to validate the client certificate if needed
    context.verify_mode = ssl.CERT_REQUIRED
    return context

# Example usage of the TLS context
if __name__ == '__main__':
    tls_context = create_tls_context()  # Create the TLS context
    # Now you can use tls_context to wrap sockets or for secure communication
