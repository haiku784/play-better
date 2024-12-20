from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()

@app.post('/user_action')
async def log_user_action(action: str):
    # Logic to log user action asynchronously
    await log_action_to_database(action)
    return JSONResponse(content={'status': 'success'}, status_code=200)

async def log_action_to_database(action):
    # Simulate logging action to a database
    pass
