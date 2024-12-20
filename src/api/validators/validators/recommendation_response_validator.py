from flask import jsonify, request
from .schemas import RecommendationSchema

def validate_recommendation_response(data):
    try:
        # Validate incoming data against the schema
        valid_data = RecommendationSchema(**data)
        return valid_data.dict(), 200  # Return validated data and status code 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 422  # Return error message and status code 422