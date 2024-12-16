from flask import Flask
from OpenSSL import SSL

# Create a Flask application
app = Flask(__name__)

# Path to certificate and key files
CERTIFICATE_PATH = 'certs/server.crt'
KEY_PATH = 'certs/server.key'

# Create SSL context
context = SSL.Context(SSL.SSLv23_METHOD)
context.use_privatekey_file(KEY_PATH)
context.use_certificate_file(CERTIFICATE_PATH)

@app.route('/')
def hello():
    return 'Hello, this is a secure server!'

if __name__ == '__main__':
    # Run the app with SSL encryption
    app.run(ssl_context=context)