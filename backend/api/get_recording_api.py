from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017/')
db = client['gameplay_db']

@app.route('/recording/<user_id>', methods=['GET'])
def get_recordings(user_id):
    recordings = list(db.recordings.find({'user_id': user_id}))
    return jsonify(recordings), 200

if __name__ == '__main__':
    app.run(debug=True)