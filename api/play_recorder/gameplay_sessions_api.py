from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

class GameplaySession(BaseModel):
    id: int
    player_name: str
    game_title: str
    duration: int
    comments: str

sessions = []

@app.post('/sessions/', response_model=GameplaySession)
def create_session(session: GameplaySession):
    sessions.append(session)
    return session

@app.get('/sessions/', response_model=List[GameplaySession])
def read_sessions():
    return sessions

@app.get('/sessions/{session_id}', response_model=GameplaySession)
def read_session(session_id: int):
    for session in sessions:
        if session.id == session_id:
            return session
    raise HTTPException(status_code=404, detail='Session not found')

@app.put('/sessions/{session_id}', response_model=GameplaySession)\def update_session(session_id: int, session: GameplaySession):
    for index, s in enumerate(sessions):
        if s.id == session_id:
            sessions[index] = session
            return session
    raise HTTPException(status_code=404, detail='Session not found')

@app.delete('/sessions/{session_id}')
def delete_session(session_id: int):
    for index, s in enumerate(sessions):
        if s.id == session_id:
            del sessions[index]
            return {'detail': 'Session deleted'}
    raise HTTPException(status_code=404, detail='Session not found')