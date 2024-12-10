from fastapi import FastAPI

app = FastAPI()

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    """Retrieve an item by ID. Optionally filter by query parameter.
    
    Parameters:
    item_id (int): The ID of the item to retrieve.
    q (str): Optional query parameter for filtering results.
    
    Returns:
    dict: A dictionary containing item details.
    """
    return {"item_id": item_id, "q": q}

@app.post("/items/")
def create_item(item: dict):
    """Create a new item.
    
    Parameters:
    item (dict): A dictionary containing item data.
    
    Returns:
    dict: The created item.
    """
    return item

@app.get("/")
def read_root():
    """Root endpoint.
    
    Returns:
    dict: A welcome message.
    """
    return {"message": "Welcome to the FastAPI documentation!"}