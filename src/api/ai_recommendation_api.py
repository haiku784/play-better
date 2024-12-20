from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from models import Recommendation
from recommendation_engine import RecommendationEngine

app = Flask(__name__)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    """
    API endpoint to fetch AI-generated recommendations based on gameplay data.
    Accepts a JSON payload with gameplay data and returns recommendations.
    """
    data = request.json  # Get the JSON data from the request
    if not data:
        return jsonify({'error': 'No input data provided'}), 400

    gameplay_data = data.get('gameplay_data')
    if not gameplay_data:
        return jsonify({'error': 'Gameplay data is required'}), 400

    # Initialize recommendation engine
    recommendation_engine = RecommendationEngine()  
    # Generate recommendations based on gameplay data
    recommendations = recommendation_engine.generate_recommendations(gameplay_data)

    return jsonify({'recommendations': recommendations}), 200

if __name__ == '__main__':
    app.run(debug=True)