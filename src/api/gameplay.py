from fastapi import FastAPI

app = FastAPI()

@app.post('/gameplay/sessions')
def create_session(session: GameplaySession):
    return {'message': 'session created', 'session_id': session.id}

@app.get('/gameplay/sessions/{session_id}')
def read_session(session_id: str):
    return {'session_id': session_id}