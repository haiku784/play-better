import socket
import ssl
from tls_configuration import create_tls_context

# Function to receive gameplay data securely using TLS

def receive_gameplay_data(host='localhost', port=8080):
    context = create_tls_context()  # Create the TLS context
    # Create a socket and bind it to the specified address and port
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_sock:
        server_sock.bind((host, port))
        server_sock.listen(5)  # Listen for incoming connections
        print('Listening for connections...')
        while True:
            client_sock, addr = server_sock.accept()  # Accept a connection
            with context.wrap_socket(client_sock, server_side=True) as tls_sock:
                data = tls_sock.recv(1024).decode('utf-8')  # Receive data securely
                print(f'Received data: {data}')  # Print the received data

# Example usage of receiving gameplay data
if __name__ == '__main__':
    receive_gameplay_data()  # Start the server to receive gameplay data