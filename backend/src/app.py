from flask import Flask, jsonify, request

app = Flask(__name__)

# Mock database of suggestions
SUGGESTIONS = [
    {'id': 1, 'text': 'Suggestion 1'},
    {'id': 2, 'text': 'Suggestion 2'},
    {'id': 3, 'text': 'Suggestion 3'}
]

@app.route('/api/suggestions', methods=['GET'])
def get_suggestions():
    """Retrieve suggestions in JSON format"""
    return jsonify(SUGGESTIONS)

if __name__ == '__main__':
    app.run(debug=True)