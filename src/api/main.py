from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.responses import JSONResponse
import shutil

app = FastAPI()

# Directory to save uploaded files
UPLOAD_DIRECTORY = "./uploads"

@app.post("/upload-session/")
async def upload_session(file: UploadFile = File(...), background_tasks: BackgroundTasks = BackgroundTasks()):
    try:
        # Save the uploaded file to the desired directory
        file_location = f"{UPLOAD_DIRECTORY}/{file.filename}"
        with open(file_location, "wb+") as file_object:
            shutil.copyfileobj(file.file, file_object)
        # Notify user (can be implemented as a task)
        background_tasks.add_task(notify_user, file.filename)
        return JSONResponse(content={"message": "Upload successful!"}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"message": str(e)}, status_code=500)

async def notify_user(filename: str):
    # Implement the logic to notify the user (e.g., send email, send WebSocket notification)
    print(f"User notified: {filename} is ready for access.")