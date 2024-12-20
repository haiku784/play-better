from fastapi import FastAPI, UploadFile, File
from src.api.database import Database

app = FastAPI()

database = Database(uri='mongodb://localhost:27017/')

@app.post('/upload/')
async def upload_video(file: UploadFile = File(...)):
    """Endpoint for uploading video files and encrypting the data before saving."""
    contents = await file.read()
    # Store the encrypted video data in the database
    database.store_user_data({'filename': file.filename, 'data': contents})
    return {'message': 'Video uploaded successfully!'}

@app.get('/videos/{user_id}')
async def get_video(user_id: str):
    """Retrieves and decrypts video data for a given user."""
    user_data = database.retrieve_user_data(user_id)
    return {'user_video_data': user_data}
