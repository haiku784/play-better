from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class Annotation(BaseModel):
    moment: str
    comment: str
    user_id: int

annotations = []

@app.post('/annotations/')
def submit_annotation(annotation: Annotation):
    annotations.append(annotation)
    return {message": "Annotation submitted successfully."}

@app.get('/annotations/')
def get_annotations():
    return annotations"