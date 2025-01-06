import socket
import ssl
from tls_configuration import create_tls_context

# Function to send gameplay data securely using TLS

def send_gameplay_data(data, host='localhost', port=8080):
    # Create a TLS context
    context = create_tls_context()
    # Create a socket and wrap it with TLS
    with socket.create_connection((host, port)) as sock:
        with context.wrap_socket(sock, server_hostname=host) as tls_sock:
            tls_sock.sendall(data.encode('utf-8'))  # Send data securely over TLS

# Example usage of sending gameplay data
if __name__ == '__main__':
    gameplay_data = 'Player1 scored a goal!'
    send_gameplay_data(gameplay_data)  # Sending gameplay data securely