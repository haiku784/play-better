import requests

# Function to simulate a request to the suggestion engine

def test_suggestion_engine():
    sample_data = {'features': [1.0, 0.5, 3.2, 1.5]}  # Example feature vector
    response = requests.post('http://localhost:5000/suggest', json=sample_data)
    print('Response from the server:', response.json())

if __name__ == '__main__':
    test_suggestion_engine()