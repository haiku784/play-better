import pytest
from sqlalchemy.orm import Session
from database import get_db  # Assuming you have a get_db method for your DB session
from models import Item  # Assume `Item` is your model

# Test function to ensure item can be added to the database

def test_create_item(db: Session):
    new_item = Item(name="Test Item", description="Test Description")  # Create a new item
    db.add(new_item)
    db.commit()  # Commit to save the item
    db.refresh(new_item)  # Refresh the instance to get new changes
    assert new_item.id is not None  # Ensure the item has been assigned an ID

# Test function to ensure item retrieval from the database

def test_read_item(db: Session):
    item = db.query(Item).first()  # Fetch the first item
    assert item is not None  # Ensure an item exists
    assert item.name == "Test Item"  # Validate item properties
