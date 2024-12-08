from flask import Flask, request, jsonify
import pickle
import numpy as np

# Load pre-trained ML model
with open('models/performance_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

app = Flask(__name__)

@app.route('/suggest', methods=['POST'])
def suggest():
    # Get incoming gameplay data from POST request
    data = request.json
    feature_vector = np.array(data['features']).reshape(1, -1)

    # Generate performance suggestion using the model
    suggestion = model.predict(feature_vector)
    return jsonify({'suggestion': suggestion[0]})

if __name__ == '__main__':
    app.run(debug=True)