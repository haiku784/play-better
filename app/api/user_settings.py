from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import logging

# Initialize FastAPI app
app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Define a Pydantic model for UserSettings
class UserSettings(BaseModel):
    user_id: str
    theme: str
    notifications_enabled: bool

# Create API endpoint to receive user settings via POST request
@app.post("/user-settings/")
async def receive_user_settings(settings: UserSettings):
    try:
        # Log received user settings
        logger.info(f"Received settings for user {settings.user_id}: {settings.json()}")
        return {
            "message": "User settings received successfully!",
            "settings": settings
        }
    except Exception as e:
        logger.error(f"Error receiving settings: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
