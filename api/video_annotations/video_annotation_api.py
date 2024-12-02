from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

# Data Structure for Annotations
class Annotation(BaseModel):
    video_id: str
    moment: float
    comment: str

# In-memory storage for annotations
annotations = []

@app.post('/annotations/', response_model=Annotation)
def submit_annotation(annotation: Annotation):
    annotations.append(annotation)
    return annotation

@app.get('/annotations/{video_id}', response_model=list[Annotation])
def get_annotations(video_id: str):
    video_annotations = [a for a in annotations if a.video_id == video_id]
    if not video_annotations:
        raise HTTPException(status_code=404, detail='No annotations found for this video.')
    return video_annotations