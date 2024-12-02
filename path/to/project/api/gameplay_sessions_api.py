from fastapi import FastAPI, HTTPException
app = FastAPI()

@app.post(\/sessions/\")
def create_session(session: Session):
    # logic to store session
    return session

@app.get(\"/sessions/{session_id}\")
def read_session(session_id: str):
    # logic to retrieve session
    return session"