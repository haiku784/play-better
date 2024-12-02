from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

class Annotation(BaseModel):
    annotationId: str
    userId: str
    gameplayMoment: int
    comment: str

annotations_db = []

@app.post('/annotations/', response_model=List[Annotation])
async def create_annotation(annotation: Annotation):
    annotations_db.append(annotation)
    return annotations_db

@app.get('/annotations/', response_model=List[Annotation])
async def get_annotations():
    return annotations_db