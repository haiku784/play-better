from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

class Annotation(BaseModel):
    moment: str
    comment: str

annotations = []

@app.post('/annotations/', response_model=Annotation)
def submit_annotation(annotation: Annotation):
    annotations.append(annotation)
    return annotation

@app.get('/annotations/', response_model=List[Annotation])
def get_annotations():
    return annotations