from fastapi import FastAPI\
app = FastAPI()\
@app.post('/annotate')\
def annotate_video(annotation: dict):\
    # Save annotation to MongoDB\
    return {'message': 'Annotation saved'}