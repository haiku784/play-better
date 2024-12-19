from fastapi import FastAPI
from prometheus_client import Counter

app = FastAPI()

# Counter for tracking active users
active_users_counter = Counter('active_users', 'Count of active users')

@app.get('/active_users')
def active_users():
    active_users_counter.inc()  # Increment count on request
    return {'active_users_count': active_users_counter._value.get()}
