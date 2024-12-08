from flask import Flask, request, jsonify, g
from functools import wraps

app = Flask(__name__)

# Simulated in-memory user store (for demonstration)
users = 
{
    'user1': 'password1',
}

# Middleware for authentication

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user' not in g:
            return jsonify({'message': 'Authentication required!'}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']
    if username in users and users[username] == password:
        g.user = username
        return jsonify({'message': 'Logged in!'}), 200
    return jsonify({'message': 'Bad credentials'}), 401

@app.route('/annotations', methods=['POST'])
@login_required
def save_annotation():
    annotation = request.json['annotation']
    # Logic to save the annotation in the backend
    return jsonify({'message': 'Annotation saved!'})