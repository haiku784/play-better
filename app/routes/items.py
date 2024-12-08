from fastapi import FastAPI, HTTPException

app = FastAPI()

@app.get('/items/{item_id}')
async def read_item(item_id: int):
    if item_id <= 0:
        raise HTTPException(status_code=404, detail='Item not found')
    return {'item_id': item_id, 'name': 'Some Item'}

@app.post('/items/')
async def create_item(item: dict):
    if 'name' not in item:
        raise HTTPException(status_code=400, detail='Name field is required')
    return {'item_id': 1, 'name': item['name']}