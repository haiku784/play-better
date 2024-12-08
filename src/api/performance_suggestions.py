from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample suggestions based on user input
suggestions = {
    'beginner': 'Focus on mastering the basics and practice regularly.',
    'intermediate': 'Start learning advanced strategies and gameplay mechanics.',
    'advanced': 'Analyze your gameplay and identify areas for improvement.'
}

@app.route('/api/suggestions', methods=['POST'])
def get_suggestions():
    data = request.json
    skill_level = data.get('skill_level')
    
    if skill_level in suggestions:
        return jsonify({'suggestion': suggestions[skill_level]}), 200
    else:
        return jsonify({'error': 'Invalid skill level provided.'}), 400

if __name__ == '__main__':
    app.run(debug=True)
