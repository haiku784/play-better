from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

# Function to connect to the database
def connect_db():
    return sqlite3.connect('game_data.db')

# Endpoint to save gameplay data
@app.route('/save', methods=['POST'])
def save_gameplay():
    data = request.get_json()
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO gameplay (score, player) VALUES (?, ?)', (data['score'], data['player']))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Data saved successfully!'}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)