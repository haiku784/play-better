from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

titles = []  # In-memory storage for e-sport titles

class Title(BaseModel):
    id: int
    name: str
    genre: str
    release_year: int

@app.post('/titles/', response_model=Title)
async def create_title(title: Title):
    # Check if title with the same ID already exists
    if any(t.id == title.id for t in titles):
        raise HTTPException(status_code=400, detail="Title ID already exists")
    titles.append(title)
    return title
