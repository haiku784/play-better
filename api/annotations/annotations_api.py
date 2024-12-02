from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class Annotation(BaseModel):
    timestamp: float
    comment: str

annotations = []

@app.post('/annotations/')
async def create_annotation(annotation: Annotation):
    annotations.append(annotation)
    return annotation

@app.get('/annotations/')
async def read_annotations():
    return annotations