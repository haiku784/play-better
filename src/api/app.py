from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi

app = FastAPI()

# Sample endpoint 1
@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str = None):
    """Retrieve an item by its ID. Optionally filter by query parameter.
    
    Args:
        item_id (int): ID of the item to retrieve.
        q (str, optional): Optional query string to filter results.
    
    Returns:
        dict: Item details.
    """
    return {"item_id": item_id, "q": q}

# Sample endpoint 2
@app.post("/items/")
async def create_item(item: dict):
    """Create a new item.
    
    Args:
        item (dict): The item data to create.
    
    Returns:
        dict: The created item data.
    """
    return item

# Custom OpenAPI documentation
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="My API",
        version="1.0.0",
        description="This is a sample API documentation.",
        routes=app.routes,
    )
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi
