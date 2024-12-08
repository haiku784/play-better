from flask import Flask, jsonify, request

app = Flask(__name__)

# Sample player data for recommendations
players = [
    {'id': 1, 'name': 'Alice', 'score': 95},
    {'id': 2, 'name': 'Bob', 'score': 90},
    {'id': 3, 'name': 'Charlie', 'score': 85},
    {'id': 4, 'name': 'David', 'score': 80},
    {'id': 5, 'name': 'Eve', 'score': 75}
]

# Endpoint to get player recommendations
@app.route('/api/recommendations', methods=['GET'])
def get_recommendations():
    max_score = request.args.get('max_score', default=100, type=int)
    recommended_players = [
        player for player in players if player['score'] >= max_score
    ]
    return jsonify(recommended_players)

if __name__ == '__main__':
    app.run(debug=True)