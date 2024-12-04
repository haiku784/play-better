from fastapi import FastAPI"n
app = FastAPI()

@app.get(\/")
async def read_root():
    return {"Hello": "World"}"