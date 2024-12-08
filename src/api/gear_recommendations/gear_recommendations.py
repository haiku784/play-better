from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required

# Initialize Flask app
app = Flask(__name__)

# Configure JWT
app.config['JWT_SECRET_KEY'] = 'your_secret_key'
jwt = JWTManager(app)

# Sample recommendations based on user data
RECOMMENDATIONS = {
    'beginner': ['Basic Tent', 'Sleeping Bag', 'Headlamp'],
    'intermediate': ['4-Season Tent', 'Insulated Sleeping Bag', 'Portable Stove'],
    'advanced': ['Ultra-light Tent', 'High-Altitude Gear', 'Expedition Stove']
}

@jwt_required()
@app.route('/api/gear-recommendations', methods=['POST'])
def get_gear_recommendations():
    # Get user data from request
    user_data = request.json
    experience_level = user_data.get('experience_level')
    
    # Validate user data
    if experience_level not in RECOMMENDATIONS:
        return jsonify({'message': 'Invalid experience level'}), 400
    
    # Get recommendations
    recommendations = RECOMMENDATIONS[experience_level]
    return jsonify({'recommendations': recommendations}), 200

if __name__ == '__main__':
    app.run(debug=True)