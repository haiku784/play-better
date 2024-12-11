from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

@app.post("/items/", response_model=Item)
async def create_item(item: Item):
    """Create an item"""
    return item

@app.get("/items/{item_id}", response_model=Item)
async def read_item(item_id: int):
    """Read an item by ID"""
    return Item(name="Sample Item", price=10.0)

@app.put("/items/{item_id}", response_model=Item)
async def update_item(item_id: int, item: Item):
    """Update an item"""
    return item

@app.delete("/items/{item_id}")
async def delete_item(item_id: int):
    """Delete an item by ID"""
    return JSONResponse(status_code=204)

@app.get("/docs")
async def get_api_docs():
    """Retrieve API documentation"""
    return JSONResponse(content="API documentation can be found at /docs")
