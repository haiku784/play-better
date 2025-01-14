from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()

@app.post("/play")
async def play():
    # Logic to start playback
    return JSONResponse(content={'status': 'playing'})

@app.post("/pause")
async def pause():
    # Logic to pause playback
    return JSONResponse(content={'status': 'paused'})

@app.post("/rewind")
async def rewind():
    # Logic to rewind playback
    return JSONResponse(content={'status': 'rewinding'})

@app.post("/fastforward")
async def fastforward():
    # Logic to fast-forward playback
    return JSONResponse(content={'status': 'fast forwarding'})

@app.post("/setspeed")
async def set_speed(speed: float):
    # Logic to set playback speed
    return JSONResponse(content={'new_speed': speed})
