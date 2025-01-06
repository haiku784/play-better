from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample data store for user feedback
feedback_store = []

@app.route('/api/feedback', methods=['POST'])
def collect_feedback():
    data = request.get_json()
    user_name = data.get('userName')
    feedback = data.get('feedback')
    feedback_store.append({'userName': user_name, 'feedback': feedback})
    return jsonify({'message': 'Feedback received'}), 201

if __name__ == '__main__':
    app.run(debug=True)