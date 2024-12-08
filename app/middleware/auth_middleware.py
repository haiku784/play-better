import jwt
from flask import request, jsonify
from functools import wraps

# Secret key for encoding and decoding JWT
SECRET_KEY = 'your_secret_key_here'

# Middleware for validating JWT

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        # Check if token is present in the request header
        if 'Authorization' in request.headers:
            token = request.headers['Authorization']

        # If token is missing, return an error
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            # Decode the token to verify its validity
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 401

        return f(*args, **kwargs)

    return decorated

