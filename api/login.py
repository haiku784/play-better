from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'

# Mock user data for demonstration
users = {
    'user1': generate_password_hash('password1'),
    'user2': generate_password_hash('password2')
}

@app.route('/login', methods=['POST'])
def login():
    
    # Get JSON data from request
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Check if user exists and password is correct
    if username in users and check_password_hash(users[username], password):
        token = jwt.encode({
            'user': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify({'token': token})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(debug=True)