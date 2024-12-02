from fastapi import FastAPI, HTTPException
app = FastAPI()
@app.post('/record')
def record_session():
    # Implementation here