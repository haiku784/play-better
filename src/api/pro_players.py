from fastapi import FastAPI

app = FastAPI()

@app.get('/pro-players/')
async def list_pro_players():
    # Logic to return a list of pro players
    return pro_players