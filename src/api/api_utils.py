import requests

def fetch_comparative_metrics(user_id, session_ids):
    response = requests.post('http://localhost:8000/compare-configurations', json={
        'user_id': user_id,
        'session_ids': session_ids
    })
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception('Failed to fetch comparative metrics.')