from fastapi import FastAPI
from pydantic import BaseModel
app = FastAPI()

class VideoAnnotation(BaseModel):
    sessionId: str
    annotations: list

@app.post('/annotations/')
async def submit_annotations(annotation: VideoAnnotation):
    # Logic to save video annotation
    return {'status': 'success'}