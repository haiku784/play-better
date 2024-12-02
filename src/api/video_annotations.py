from fastapi import FastAPI

app = FastAPI()

@app.post('/annotations/')
async def create_annotation(annotation: Annotation):
    # Logic to store video annotations
    return {'message': 'Annotation saved!'}