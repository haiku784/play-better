from flask import Flask, request, jsonify"
from werkzeug.security import generate_password_hash\
\
app = Flask(__name__)\
\
# In-memory user storage (replace with a database in production)\
users = {}\
\
@app.route('/api/register', methods=['POST'])\
def register_user():\
    data = request.get_json()\
    username = data.get('username')\
    password = data.get('password')\
\
    # Check if username already exists\
    if username in users:\
        return jsonify({'message': 'User already exists'}), 409\
\
    # Hash the password and save it\
    hashed_password = generate_password_hash(password)\
    users[username] = hashed_password\
\
    return jsonify({'message': 'User registered successfully'}), 201\
\
if __name__ == '__main__':\
    app.run(debug=True)\
