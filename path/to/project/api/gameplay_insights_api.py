from fastapi import FastAPI, HTTPException
app = FastAPI()

@app.post(\/insights/\")
def create_insight(insight: Insight):
    # logic to store insight
    return insight

@app.get(\"/insights/{session_id}\")
def read_insight(session_id: str):
    # logic to retrieve insight
    return insight"