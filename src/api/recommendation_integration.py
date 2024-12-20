from flask import Flask, jsonify, request
from your_project import RecommendationAlgorithm

app = Flask(__name__)

@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    user_id = request.args.get('user_id')
    recommendations = RecommendationAlgorithm.get_recommendations(user_id)
    return jsonify(recommendations), 200

if __name__ == '__main__':
    app.run(debug=True)