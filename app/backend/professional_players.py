from fastapi import FastAPI

app = FastAPI()

@app.get('/professionals/')
async def get_professional_players():
    return [{'name': 'Player1', 'country': 'USA'}, {'name': 'Player2', 'country': 'KOR'}]