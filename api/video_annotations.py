from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class Annotation(BaseModel):
    annotationId: str
    videoId: str
    userId: str
    comment: str
    timestamp: float

annotations = []

@app.post('/annotations/')
async def create_annotation(annotation: Annotation):
    annotations.append(annotation)
    return annotation

@app.get('/annotations/{video_id}')
async def read_annotations(video_id: str):
    return [a for a in annotations if a.videoId == video_id]